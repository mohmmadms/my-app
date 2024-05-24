// upload.js

const multer = require('multer');
const path = require('path');

// Set storage engine for course images
const courseStorage = multer.diskStorage({
  destination: '/opt/render/project/files/courseImages', // Render's persistent storage directory for course images
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Set storage engine for profile images
const profileStorage = multer.diskStorage({
  destination: '/opt/render/project/files/profileImages', // Render's persistent storage directory for profile images
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init upload for course images
const uploadCourseImage = multer({
  storage: courseStorage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('courseImage'); // 'courseImage' is the field name

// Init upload for profile images
const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('profileImage'); // 'profileImage' is the field name

module.exports = {
  uploadCourseImage,
  uploadProfileImage,
};
