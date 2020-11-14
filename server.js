//const { endsWith } = require("sequelize/types/lib/operators")


const express = require('express');
const express_hbs = require('express-handlebars');
const path = require('path');
//const db = require('./config/connection');




const app = express();
app.get('/', (req,res) => {
    res.send('Test');
});

const PORT = process.env.Port || 8080;

app.listen(PORT, console.log(`listening on port ${PORT}`));
