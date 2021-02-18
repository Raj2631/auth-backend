import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel';

import generateToken from '../utils/generateToken';

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.exists({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User exists already.' });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({ message: 'Something went wrong' });
  }
});

// @desc    Login existing user and get token
// @route   POST /api/users/login
// @access  Public

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/login
// @access  Private

export const getUserProfile = asyncHandler(async (req: any, res) => {
  res.send('Success');
});
