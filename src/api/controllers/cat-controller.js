import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  console.log('postCat', req.body);
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const catId = req.params.id;
  const updatedData = req.body;

  const result = await modifyCat(updatedData, catId);

  if (result) {
    res.status(200).json(result);
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = async (req, res) => {
  const catId = req.params.id;

  const result = await removeCat(catId);

  if (result) {
    res.status(200);
    res.json({message: 'Cat deleted succesfully'});
  } else {
    res.status(404);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};
