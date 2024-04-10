let userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => Number(item.user_id) === id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return {user_id: newId};
};

const deleteUserController = (id) => {
  if (!findUserById(id)) {
    return false;
  }
  userItems = userItems.filter((item) => Number(item.user_id) !== id);
  return true;
};

const updateUser = (id, user) => {
  const currentUser = userItems.find((item) => Number(item.user_id) === id);
  console.log(id, currentUser);

  if (!currentUser) {
    console.log('User not found', id, user);
    return false;
  }

  const {name, username, email, role, password} = user;

  currentUser.name = name;
  currentUser.username = username;
  currentUser.email = email;
  currentUser.role = role;
  currentUser.password = password;

  return true;
};

export {listAllUsers, findUserById, addUser, deleteUserController, updateUser};
