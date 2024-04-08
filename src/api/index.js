import express from 'express';
import catRouter from './routes/user-router.js';

const router = express.Router();

// bind base url for all cat routes to catRouter
router.use('/users', catRouter);

export default router;
