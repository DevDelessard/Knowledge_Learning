const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Récupérer tous les achats
router.get('/', (req, res) => {
    const query = 'SELECT * FROM purchases';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des achats:', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.json(results);
        }
    });
});

// Ajouter un nouvel achat
router.post('/', (req, res) => {
    const { user_id, lesson_id, course_id, purchase_date } = req.body;
    const query = 'INSERT INTO purchases (user_id, lesson_id, course_id, purchase_date) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, lesson_id, course_id, purchase_date], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout de l\'achat:', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.status(201).json({ id: result.insertId, ...req.body });
        }
    });
});

module.exports = router;
