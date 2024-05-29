const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', authenticate, upload.single('image'), createItem);
router.put('/:id', authenticate, upload.single('image'), updateItem);
router.delete('/:id', authenticate, deleteItem);

module.exports = router;
