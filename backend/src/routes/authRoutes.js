import express from 'express';
import authController from '../controllers/authController.controller.js';
import { validateRequest } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { signupSchema, signinSchema } from '../schemas/authSchemas.js';

const router = express.Router();

router.post('/signup',
  validateRequest(signupSchema, 'body'),
  authController.signup
);

router.post('/signin',
  validateRequest(signinSchema, 'body'),
  authController.signin
);

router.get('/me',
  authenticateToken,
  authController.me
);

export default router; 