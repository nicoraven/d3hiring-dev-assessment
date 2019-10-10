// SETUP
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CONNECT TO DATABASE
const db = require('./models/index').sequelize;

db.authenticate()
  .then(() => {
    console.log('Connection to database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// IMPORT ROUTES
const apiRoutes = require('./routes/api'); 
app.use('/api', apiRoutes);
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the student administration system.'
}));

// LISTEN TO SERVER
app.listen(PORT, () => console.log(`~~~ Listening on port ${PORT}! ~~~`));