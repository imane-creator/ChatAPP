const Sequelize = require('sequelize');

// Création d'un nouvel objet Sequelize
const sequelize = new Sequelize(
    'dbS',
    'root',
    '', {
        dialect: 'mysql',
        host: 'localhost'
    }
);

// Exportation de l'objet sequelize
module.exports = sequelize;

(async () => {
    try {
        // Authentification à la base de données
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // Synchronisation des modèles avec la base de données
        await sequelize.sync();
        console.log("All models were synchronized successfully.");

    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();
