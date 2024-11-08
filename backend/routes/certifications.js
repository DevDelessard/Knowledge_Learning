const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Récupérer toutes les certifications
router.get('/', (req, res) => {
    const query = 'SELECT * FROM certifications';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des certifications:', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.json(results);
        }
    });
});

// Ajouter une nouvelle certification
router.post('/', (req, res) => {
    const { user_id, theme_id, certification_date } = req.body;
    const query = 'INSERT INTO certifications (user_id, theme_id, certification_date) VALUES (?, ?, ?)';
    db.query(query, [user_id, theme_id, certification_date], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de la certification:', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.status(201).json({ id: result.insertId, ...req.body });
        }
    });
});

module.exports = router;
