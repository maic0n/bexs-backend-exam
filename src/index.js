require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const http = require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./config/routes')(app);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`bexs-backend flight-api is running on port: ${port}`);
});

module.exports = app;
