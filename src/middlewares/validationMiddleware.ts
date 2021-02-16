import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const userValidationRules = () => [
  check('name', 'Name is required').exists(),
  check('email', 'Please enter a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 5 }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
