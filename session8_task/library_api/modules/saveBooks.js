import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/books.json');

export function saveBooks(books) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2), 'utf-8');
  } catch (error) {
    throw new Error('Failed to save database file: ' + error.message);
  }
}