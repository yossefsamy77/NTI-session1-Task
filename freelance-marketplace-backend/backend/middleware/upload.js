const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Only allow image files
function fileFilter(req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed'));
  }
}


function createUploader(subfolder, prefix) {
  const uploadDir = path.join(__dirname, '..', 'uploads', subfolder);

 
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '' + Math.round(Math.random() * 1e6);
      cb(null, `${prefix}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  });

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } 
  });
}


const gigUpload = createUploader('gigs', 'gig');
const profileUpload = createUploader('profiles', 'profile');

module.exports = { gigUpload, profileUpload };
