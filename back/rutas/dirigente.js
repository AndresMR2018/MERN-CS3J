const express = require('express');
const router = express.Router();

const { list, read, create, remove, dirigenteById, photo } = require('../controller/dirigenteController');

// list 
router.get('/listar', list);
router.post('/crear', create);
router.get('/photo/:dirigenteId', photo);
router.get('/:dirigenteId', read);
router.delete('/:dirigenteId', remove);
router.param("dirigenteId", dirigenteById);
module.exports = router;