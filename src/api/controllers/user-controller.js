import {
  addUser,
  findUserById,
  listAllUsers,
  deleteUserController,
  updateUser,
} from '../models/user-model.js';

import bcrypt from 'bcrypt';

import {getCatsByUserId} from '../models/cat-model.js';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserCats = async (req, res) => {
  const cats = await getCatsByUserId(req.params.id);
  if (cats.length) {
    res.json(cats);
  } else {
    res.sendStatus(404);
  }
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  console.log('postUser', req.body);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  const result = await updateUser(req.params.id, req.body);
  if (result) {
    res.status(200);
    res.json({message: 'User updated.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const result = await deleteUserController(req.params.id);
  if (result) {
    res.status(200);
    res.json({message: 'User deleted.', result});
  } else {
    res.sendStatus(400);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser, getUserCats};
