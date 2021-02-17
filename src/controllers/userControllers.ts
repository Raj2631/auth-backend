import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel';

import generateToken from '../utils/generateToken';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
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
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Something went wrong.');
    }
  }
);
