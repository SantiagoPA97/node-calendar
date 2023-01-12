const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Create server
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

//Listening
app.listen(process.env.PORT, ()=> console.log(`Server running in port ${process.env.PORT}`));

//Reading and parsing the body
app.use(express.json()); 

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Public folder
app.use(express.static('public'));