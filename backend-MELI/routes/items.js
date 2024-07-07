const { Router } = require('express');
const { getItem, getSearchResults } = require('../controllers/items.js');

const router = Router();

router.get('/:id', getItem);

router.get('/', getSearchResults);

module.exports = router;