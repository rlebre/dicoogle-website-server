require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const { transports, format } = require('winston');

const Download = require('./controllers/downloads');
const downloadRoutes = require('./routes/downloads');
const contactRoutes = require('./routes/contacts');
const sequelize = require('./sequelize');
const logger = require('./logger');


logger.info('Initializing database...');

sequelize.authenticate().then(() => {
    logger.info('Database connection OK.');
    logger.info('Starting syncing...');

    sequelize.sync().then(() => {
        logger.info('Database done.');
    });
    // sequelize.sync({ force: true }).then(() => { console.log('synced'); });
}).catch(err => {
    logger.error('Unable to connect to the database:');
    logger.error(err.message);
    process.exit(1);
});


const app = express();

app.use(bodyParser.json());

const allowlist = [
    'http://localhost:8080',
    'https://dicoogle.com',
    'https://www.dicoogle.com'
];

const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(cors());


app.use(expressWinston.logger({
    transports: [
        new transports.File({ filename: 'services.log' })
    ],
    requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query', 'params', 'body'],
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}}",
    meta: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; },
}));


app.use('/api/v1/download', downloadRoutes);
app.use('/api/v1/contact', contactRoutes);
app.get('/download/:hash', Download.download);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    logger.info(`Server running on port ${PORT}`);
});
