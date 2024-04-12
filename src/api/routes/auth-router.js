import express from 'express';
import {postLogin} from '../controllers/auth-controller';

const authRouter = express.Router();

authRouter.route('/login').post(postLogin);

export default authRouter;
