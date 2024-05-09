const express = require('express')
const router = express.Router()

const {
  signup,
  login,
  profile,
  signout,
  editProfile,
  deleteAccount,
} = require('../controllers/userController')
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signup)
router.post('/login', login)
router.get('/my-profile', authMiddleware, profile)
router.post('/signout', signout)

router.put('/edit-profile/:id', authMiddleware, editProfile);

router.delete('/delete-account/', authMiddleware, deleteAccount);


module.exports = router