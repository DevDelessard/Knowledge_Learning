const db = require('../config/db');

// Fonction pour récupérer tous les achats
const getAllPurchases = (callback) => {
    const query = 'SELECT * FROM purchases';
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

// Fonction pour ajouter un achat
const createPurchase = (purchaseData, callback) => {
    const { user_id, lesson_id, course_id, purchase_date } = purchaseData;
    const query = 'INSERT INTO purchases (user_id, lesson_id, course_id, purchase_date) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, lesson_id, course_id, purchase_date], (err, results) => {
        callback(err, results);
    });
};

// Fonction pour récupérer les achats par utilisateur
const getPurchasesByUserId = (userId, callback) => {
    const query = 'SELECT * FROM purchases WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        callback(err, results);
    });
};

module.exports = {
    getAllPurchases,
    createPurchase,
    getPurchasesByUserId,
};
