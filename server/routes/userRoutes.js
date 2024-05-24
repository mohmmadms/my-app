const express = require('express');
const router = express.Router();
const { uploadProfileImage } = require('../utils/upload');

const {
  signup,
  login,
  profile,
  signout,
  editProfile,
  deleteAccount,
} = require('../controllers/userController');
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', uploadProfileImage, signup);
router.post('/login', login);
router.get('/my-profile', authMiddleware, profile);
router.post('/signout', signout);
router.put('/edit-profile/:id', authMiddleware, uploadProfileImage, editProfile);
router.delete('/delete-account/', authMiddleware, deleteAccount);

module.exports = router;
