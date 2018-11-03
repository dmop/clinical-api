'use strict';

const express    = require('express');
const router     = express.Router();
const controller = require('../src/controllers/contactsController')();

// Listar regras
router.get('/',       controller.list);
//Cadastro de regra de atendimento
router.post('/',      controller.create);
// Apagar regra
router.delete('/:id', controller.remove);

module.exports = router;
