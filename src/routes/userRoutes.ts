import express from 'express';
import { registerUser } from '../controllers/userControllers';
import {
  userValidationRules,
  validate,
} from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/', userValidationRules(), validate, registerUser);

export default router;
