import { Router } from 'express';
import { AuthController } from './auth.controller';

const authRouter = Router();

// Sign up
// POST /api/v1/auth/signup
authRouter.post('/signup', AuthController.signup);

// Log in
// POST /api/v1/auth/login
authRouter.post('/login', AuthController.login);

export default authRouter;