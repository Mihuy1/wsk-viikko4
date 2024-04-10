import {
  addUser,
  findUserById,
  listAllUsers,
  deleteUserController,
  updateUser,
} from '../models/user-model.js';

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  console.log('postUser', req.body);
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  const id = Number(req.params.id); // Convert id to number

  const updatedUser = updateUser(id, req.body);

  if (updatedUser) {
    res.json({message: 'User item updated.'});
  } else {
    res.sendStatus(404); // Sending 404 if user not found
  }
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const result = deleteUserController(id);
  if (result) {
    res.json({message: 'User item deleted.'});
  } else {
    res.sendStatus({message: 'User item not found and not deleted.'});
  }

  res.sendStatus(200);
};

export {getUser, getUserById, postUser, putUser, deleteUser};
