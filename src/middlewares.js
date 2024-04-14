import sharp from 'sharp';
import path from 'path';
import jwt from 'jsonwebtoken';
import {findCatById} from './api/models/cat-model.js';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  const filePath = req.file.path;
  const thumbnailPath = path.join(
    path.dirname(filePath),
    path.basename(filePath, path.extname(filePath)) +
      '_thumb' +
      path.extname(filePath)
  );

  try {
    await sharp(filePath).resize(160, 160).png().toFile(thumbnailPath);
  } catch (err) {
    console.error(err);
  }

  next();
};

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

const isOwnerOrAdmin = async (req, res, next) => {
  const catId = req.params.id;
  const userId = req.user.user_id;
  const role = req.user.role;

  const cat = await findCatById(catId);

  if (cat.owner === userId || role === 'admin') {
    next();
  } else {
    res.status(403).json({message: 'You are not the owner of this cat.'});
  }
};

export {authenticateToken, createThumbnail, isOwnerOrAdmin};
