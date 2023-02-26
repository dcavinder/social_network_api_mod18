const express = require('express');
const database = require('./config/connection');
const routes = require('./routes');
const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

database.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API is running on port ${PORT}!`);
    });
});