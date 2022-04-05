const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite3',
    logQueryParameters: true,
    benchmark: true,
    logging: false
});

const modelDefiners = [
    require('./models/user.model'),
    require('./models/download-request.model'),
    require('./models/contact-request.model')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;