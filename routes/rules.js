'use strict';

const express = require('express');
const router = express.Router();
const rules = require('../src/controllers/rulesController')();

// Listar regras
// router.get('/',       controller.list);
//Cadastro de regra de atendimento
router.post('/', rules.create);
// Apagar regras
// router.delete('/:id', controller.remove);

module.exports = router;
