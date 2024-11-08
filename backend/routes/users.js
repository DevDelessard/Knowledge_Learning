// Importation des modules et configuration
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');

// Récupérer tous les utilisateurs
router.get('/', userController.getUsers);

// Ajouter un utilisateur avec un mot de passe haché
router.post('/add', userController.addUser);

// Authentification d'un utilisateur
router.post('/login', userController.loginUser);

module.exports = router;
