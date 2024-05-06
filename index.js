const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT ?? 3000;
const database = require('./src/services/db.service');
const {seedDatabase} = require('./src/utils/db.utils');

const routes = require('./src/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

Object.keys(routes).forEach((route) => {
    console.log(`Adding route: /${route}`);
    app.use(`/${route}`, routes[route]);
});

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to the Restaurant API',
        routes: Object.keys(routes),
    });
    }
);

database.authenticate().then(async (response) => {
    console.log('Connection to the database has been established successfully');
    // Truncates all tables and seeds the database with the data from the CSV file
    await database.sync({force: true});
    await seedDatabase();
}).catch((e) => {
    console.log('Unable to connect to the database', e);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    }
);