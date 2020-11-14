//const { endsWith } = require("sequelize/types/lib/operators")


const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
const path = require('path');

const db = require('./config/connection');

db.authenticate().then(() => {
 console.info('Database connected.')
})
.catch(err => {
 console.error('ERROR - Unable to connect to the database:', err)
})

const app = express();

app.get('/', (req,res) => {
    res.send('Test');
});

const PORT = process.env.Port || 8080;

app.listen(PORT, console.log(`listening on port ${PORT}`));
