const db = require('../config/db');

// Fonction pour récupérer tous les utilisateurs
const getAllUsers = (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

// Fonction pour ajouter un utilisateur
const createUser = (userData, callback) => {
    const { name, email, hashedPassword, role } = userData;
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, role], (err, results) => {
        callback(err, results);
    });
};

// Fonction pour récupérer un utilisateur par email (pour la connexion)
const getUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        callback(err, results);
    });
};

module.exports = {
    getAllUsers,
    createUser,
    getUserByEmail,
};
