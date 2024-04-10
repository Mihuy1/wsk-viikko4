import {
  addCat,
  findCatById,
  listAllCats,
  updateCat,
  deleteCatController,
} from '../models/cat-model.js';

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

/* const postCat = (req, res) => {
  console.log('postCat', req.body);
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};*/

const postCat = (req, res) => {
  console.log('postCat req body:', req.body);
  console.log('postCat req file:', req.file);

  const result = addCat(req.body, req.file.filename ? req.file.filename : null);
  if (result.cat_id) {
    res.sendStatus(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  const id = Number(req.params.id); // Convert id to number

  const updatedCat = updateCat(id, req.body);

  if (updatedCat) {
    res.json({message: 'Cat item updated.'});
  } else {
    res.sendStatus(404); // Sending 404 if user not found
  }
};

const deleteCat = (req, res) => {
  const id = Number(req.params.id);
  const result = deleteCatController(id);
  if (result) {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.sendStatus({message: 'Cat item not found and not deleted.'});
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};
