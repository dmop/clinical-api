'use strict';

const express    = require('express');
const router     = express.Router();
const intervals = require('../src/controllers/intervalsController')();

// Listar Horários disponíveis
router.post('/', intervals.all);

module.exports = router;
