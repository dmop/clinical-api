'use strict';

const express = require('express');
const router = express.Router();
const rules = require('../src/controllers/rulesController')();

// Listar regras
router.get('/', rules.all);
//Cadastro de regra de atendimento
router.post('/create', rules.create);
// Apagar regras
router.delete('/:id', rules.remove);

module.exports = router;
