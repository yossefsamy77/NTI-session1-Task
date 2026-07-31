import http from 'http';
import { readBooks } from './modules/readBooks.js';
import { saveBooks } from './modules/saveBooks.js';
import { parseBody } from './modules/parseBody.js';

const PORT = 3000;

// Helper function لارسال الـ JSON Response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  try {
    // 1️⃣ GET /books - استرجاع كل الكتب
    if (method === 'GET' && url === '/books') {
      const books = readBooks();
      return sendJSON(res, 200, { success: true, count: books.length, data: books });
    }

    // 2️⃣ POST /books - إضافة كتاب جديد
    if (method === 'POST' && url === '/books') {
      const body = await parseBody(req);

      const { title, author, price, available } = body;

      // التأكد من البيانات المطلوبة
      if (!title || !author || price === undefined) {
        return sendJSON(res, 400, {
          success: false,
          error: 'Missing required fields: title, author, and price are required.'
        });
      }

      const books = readBooks();

      // توليد ID تلقائي
      const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        price: Number(price),
        available: available !== undefined ? Boolean(available) : true
      };

      books.push(newBook);
      saveBooks(books);

      return sendJSON(res, 201, {
        success: true,
        message: 'Book added successfully',
        data: newBook
      });
    }

    // 3️⃣ DELETE /books/:id - حذف كتاب عن طريق الـ ID
    if (method === 'DELETE' && url.startsWith('/books/')) {
      const idParts = url.split('/');
      const bookId = parseInt(idParts[2], 10);

      if (isNaN(bookId)) {
        return sendJSON(res, 400, { success: false, error: 'Invalid Book ID' });
      }

      const books = readBooks();
      const bookIndex = books.findIndex(b => b.id === bookId);

      if (bookIndex === -1) {
        return sendJSON(res, 404, { success: false, error: `Book with ID ${bookId} not found` });
      }

      const deletedBook = books.splice(bookIndex, 1)[0];
      saveBooks(books);

      return sendJSON(res, 200, {
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook
      });
    }

    // 4️⃣ Route غير معروف
    return sendJSON(res, 404, { success: false, error: 'Route not found' });

  } catch (error) {
    // معالجة الأخطاء العامة
    return sendJSON(res, 500, { success: false, error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});