const express = require('express');
const router = express.Router();

const { list, read, create, remove, productoById, photo } = require('../controller/productoController');

// list 
router.get('/listar', list);
router.post('/crear', create);
router.get('/photo/:productoId', photo);
router.get('/:productoId', read);
router.delete('/:productoId', remove);
router.param("productoId", productoById);
module.exports = router;