const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Contrôleur pour récupérer tous les utilisateurs
const getUsers = (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs:', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.json(results);
        }
    });
};

// Contrôleur pour ajouter un utilisateur avec un mot de passe haché
const addUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        userModel.createUser({ name, email, hashedPassword, role }, (err, results) => {
            if (err) {
                console.error('Erreur lors de la création de l\'utilisateur:', err);
                res.status(500).send('Erreur serveur');
            } else {
                res.status(201).send('Utilisateur créé avec succès');
            }
        });
    } catch (err) {
        console.error('Erreur lors du hachage du mot de passe:', err);
        res.status(500).send('Erreur serveur');
    }
};

// Contrôleur pour la connexion de l'utilisateur
const loginUser = (req, res) => {
    const { email, password } = req.body;
    userModel.getUserByEmail(email, async (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', err);
            return res.status(500).send('Erreur serveur');
        }
        if (results.length === 0) {
            return res.status(401).send('Utilisateur non trouvé');
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Mot de passe incorrect');
        }

        res.status(200).send('Connexion réussie');
    });
};

module.exports = {
    getUsers,
    addUser,
    loginUser,
};
