import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, filename, password, role} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, filename, password, role)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [name, username, email, filename, password, role].map(
    (arvo) => arvo ?? null
  );
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user_id: rows[0].insertId};
};

const modifyUser = async (user, id) => {
  const {name, username, email, filename, password, role} = user;
  const sql = `UPDATE wsk_users SET name = ?, username = ?, email = ?, filename = ?, password = ?, role = ? WHERE user_id = ?`;
  const params = [name, username, email, filename, password, role, id];
  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const deleteUserController = async (id) => {
  const [rows] = await promisePool.execute(
    'DELETE FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};
const updateUser = async (id, user) => {
  const {name, username, email, role, password} = user;
  const sql = `UPDATE users SET name = ?, username = ?, email = ?, role = ?, password = ? WHERE user_id = ?`;
  const params = [name, username, email, role, password, id];
  const [rows] = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return true;
};

const getUserByUsername = async (username) => {
  const sql = `SELECT * FROM wsk_users WHERE username = ?`;
  const rows = await promisePool.execute(sql, username);
  if (rows.length === 0) return false;

  return true;
};

const deleteUserAndCats = async (id) => {
  await promisePool.execute('DELETE FROM cats WHERE owner = ?', [id]);
  return deleteUserController(id);
};

export {
  listAllUsers,
  findUserById,
  addUser,
  deleteUserController,
  updateUser,
  getUserByUsername,
  modifyUser,
  deleteUserAndCats,
};
