const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Récupérer toutes les leçons
router.get('/', (req, res) => {
    const query = 'SELECT * FROM lessons';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des leçons:', err);
            res.status(500).send('Erreur serveur');
        } else {
            res.json(results);
        }
    });
});

// Autres routes pour ajouter, mettre à jour et supprimer une leçon
// ...

module.exports = router;
