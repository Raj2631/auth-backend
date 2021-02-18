import express from 'express';
import { loginUser, registerUser } from '../controllers/userControllers';
import {
  userValidationRules,
  validate,
} from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/', userValidationRules(), validate, registerUser);
router.post('/login', loginUser);
export default router;
