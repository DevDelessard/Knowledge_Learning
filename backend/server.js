const express = require('express');
const app = express();
const port = 3001;
const db = require('./config/db');

// Middleware pour lire le JSON dans les requêtes
app.use(express.json());

// Importer les routes
const userRoutes = require('./routes/users');
const lessonRoutes = require('./routes/lessons');
const purchaseRoutes = require('./routes/purchases');
const certificationRoutes = require('./routes/certifications');

// Utiliser les routes
app.use('/users', userRoutes);
app.use('/lessons', lessonRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/certifications', certificationRoutes);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API Knowledge Learning');
});