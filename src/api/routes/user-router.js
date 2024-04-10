import express from 'express';

import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser); // Q: How to access this route? A: http://localhost:3000/api/v1/users/
userRouter.route('/:id').get(getUserById).put(putUser); // Q: Does this route need a parameter? A: Yes Q: How to access this route? A: http://localhost:3000/api/v1/users/1
userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser); // Q: How to access this route? A: http://localhost:3000/api/v1/users/

export default userRouter;
