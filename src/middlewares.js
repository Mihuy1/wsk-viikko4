import sharp from 'sharp';
import path from 'path';

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

export {createThumbnail};
