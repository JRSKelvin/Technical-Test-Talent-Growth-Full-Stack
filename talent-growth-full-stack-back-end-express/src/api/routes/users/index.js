const express = require('express');
const verifyToken = require('../../../middleware/verify-token');
const usersController = require('../../controllers/users');

const router = express.Router();

router.post('/login', usersController.login);
router.post('/register', usersController.register);

router.get('/', verifyToken, usersController.getAll);
router.get('/:id', verifyToken, usersController.getById);
router.post('/', verifyToken, usersController.create);
router.put('/:id', verifyToken, usersController.update);
router.delete('/:id', verifyToken, usersController.delete);

module.exports = router;
