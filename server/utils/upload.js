const multer = require('multer');
const path = require('path');

// Determine the destination directory based on environment
const courseImagesDir = process.env.COURSE_IMAGES_DIR || 'uploads/courseImages';
const profileImagesDir = process.env.PROFILE_IMAGES_DIR || 'uploads/profileImages';

// Set storage engine for course images
const courseStorage = multer.diskStorage({
  destination: courseImagesDir,
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Set storage engine for profile images
const profileStorage = multer.diskStorage({
  destination: profileImagesDir,
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
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('courseImage');

// Init upload for profile images
const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('profileImage');

module.exports = {
  uploadCourseImage,
  uploadProfileImage,
};
