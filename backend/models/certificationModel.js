const db = require('../config/db');

// Fonction pour récupérer toutes les certifications
const getAllCertifications = (callback) => {
    const query = 'SELECT * FROM certifications';
    db.query(query, (err, results) => {
        callback(err, results);
    });
};

// Fonction pour ajouter une certification
const createCertification = (certificationData, callback) => {
    const { user_id, theme_id, certification_date } = certificationData;
    const query = 'INSERT INTO certifications (user_id, theme_id, certification_date) VALUES (?, ?, ?)';
    db.query(query, [user_id, theme_id, certification_date], (err, results) => {
        callback(err, results);
    });
};

// Fonction pour récupérer les certifications par utilisateur
const getCertificationsByUserId = (userId, callback) => {
    const query = 'SELECT * FROM certifications WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        callback(err, results);
    });
};

module.exports = {
    getAllCertifications,
    createCertification,
    getCertificationsByUserId,
};
