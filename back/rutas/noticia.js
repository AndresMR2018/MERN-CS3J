const express = require('express');
const router = express.Router();

const { list, read, create, remove, noticiaById, photo } = require('../controller/noticiaController');

// list 
router.get('/listar', list);
router.post('/crear', create);
router.get('/photo/:noticiaId', photo);
router.get('/:noticiaId', read);
router.delete('/:noticiaId', remove);
router.param("noticiaId", noticiaById);
module.exports = router;