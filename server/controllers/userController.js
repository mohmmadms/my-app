const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const {uploadToFirebaseStorage} = require('../utils/upload')

// JWT generation
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Sign Up
const signup = async (req, res, next) => {
  const { name, email, password, isAdmin, location, nationality, dateOfBirth, phoneNumber } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please include all fields' });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profileImageUrl = null;
    if (req.file) {
      try {
        const publicUrl = await uploadToFirebaseStorage(req.file, 'profileImages');
        profileImageUrl = publicUrl;
      } catch (error) {
        console.error('Error uploading profile image:', error);
        return res.status(500).json({ error: 'Failed to upload profile image to Firebase Storage' });
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      profileImage: profileImageUrl,
      location,
      nationality,
      dateOfBirth,
      phoneNumber,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



// Login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Profile
const profile = async (req, res, next) => {
  try {
    const user = {
      _id: req.user._id,
      profileImage: req.user.profileImage ? req.user.profileImage : null,
      Email: req.user.email,
      Name: req.user.name,
      Location: req.user.location,
      Nationality: req.user.nationality,
      DateOfBirth: req.user.dateOfBirth,
      phoneNumber: req.user.phoneNumber
    };
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Sign Out
const signout = async (req, res, next) => {
  try {
    res.clearCookie('token');

    // Clear any other user-related data from the request object
    req.user = null;

    res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Edit Profile
const editProfile = async (req, res, next) => {
  try {
    const { name, email, password, location, nationality, dateOfBirth, phoneNumber } = req.body;
    const userId = req.user._id;

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updates.password = hashedPassword;
    }
    if (location) updates.location = location;
    if (nationality) updates.nationality = nationality;
    if (dateOfBirth) updates.dateOfBirth = dateOfBirth;
    if (phoneNumber) updates.phoneNumber = phoneNumber;

    if (req.file) {
      try {
        const publicUrl = await uploadToFirebaseStorage(req.file, 'profileImages');
        updates.profileImage = publicUrl; // Set profile image URL from Firebase
      } catch (error) {
        console.error('Error uploading profile image:', error);
        return res.status(500).json({ error: 'Failed to upload profile image to Firebase Storage' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = {
      profileImage: updatedUser.profileImage,
      Email: updatedUser.email,
      Name: updatedUser.name,
      Location: updatedUser.location,
      Nationality: updatedUser.nationality,
      DateOfBirth: updatedUser.dateOfBirth,
      PhoneNumber: updatedUser.phoneNumber
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error in editProfile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};



// Delete User's Account
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
   
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signup, login, profile, signout, editProfile, deleteAccount };
