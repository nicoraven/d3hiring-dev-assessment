// SETUP
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// CONNECT TO DB


// IMPORT ROUTES
const apiRoutes = require('./routes/api'); 
app.use('/api', apiRoutes);

// LISTEN TO SERVER
server.listen(PORT, () => console.log(`~~~ Listening on port ${PORT}! ~~~`));