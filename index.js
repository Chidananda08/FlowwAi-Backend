const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db'); 

const app = express();


app.use(bodyParser.json());


sequelize.sync().then(() => {
    console.log("Database & tables created!");
});


app.get('/', (req, res) => {
    res.send('Welcome to the Finance Tracker API');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
