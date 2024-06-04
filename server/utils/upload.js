const admin = require('firebase-admin');
const path = require('path');
const multer = require('multer');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require(path.resolve(process.env.FIREBASE_KEY_FILE))), // Use path.resolve to correctly resolve the file path
  storageBucket: process.env.FIREBASE_BUCKET_URL,
});

const bucket = admin.storage().bucket();

// Memory storage
const storage = multer.memoryStorage();

// Check file type function
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

// Upload to Firebase Storage function
async function uploadToFirebaseStorage(file, folder) {
  const blob = bucket.file(`${folder}/${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
    predefinedAcl: 'publicRead',
  });

  return new Promise((resolve, reject) => {
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    }).on('error', (err) => {
      reject(err);
    }).end(file.buffer);
  });
}

// Init upload for course images
const uploadCourseImage = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('courseImage');

// Init upload for profile images
const uploadProfileImage = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('profileImage');

// Middleware to handle course image upload and save to Firebase
const handleCourseImageUpload = (req, res, next) => {
  uploadCourseImage(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }
    try {
      const publicUrl = await uploadToFirebaseStorage(req.file, 'courseImages');
      req.file.firebaseUrl = publicUrl; // Add URL to request object for further use
      next();
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  });
};

// Middleware to handle profile image upload and save to Firebase
const handleProfileImageUpload = (req, res, next) => {
  uploadProfileImage(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }
    try {
      const publicUrl = await uploadToFirebaseStorage(req.file, 'profileImages');
      req.file.firebaseUrl = publicUrl; // Add URL to request object for further use
      next();
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  });
};

module.exports = {
  handleCourseImageUpload,
  handleProfileImageUpload,
};
