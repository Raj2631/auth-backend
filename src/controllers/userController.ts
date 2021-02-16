import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel';

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
      res.status(200).json(user);
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  }
);
