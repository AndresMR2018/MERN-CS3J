const express = require('express');
const router = express.Router();

const { list, read, create, remove, jugadorById, photo } = require('../controller/jugadorController');

// list 
router.get('/listar', list);
router.post('/crear', create);
router.get('/photo/:jugadorId', photo);
router.get('/:jugadorId', read);
router.delete('/:jugadorId', remove);
router.param("jugadorId", jugadorById);
module.exports = router;