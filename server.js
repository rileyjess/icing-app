// Import necessary modules

const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const expressHandlebars = require('express-handlebars');  
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models'); 
const routes = require('./controllers');  // Importing controllers (index.js from controllers)
const helpers = require('./utils/helpers');  

// Load environment variables from .env file

dotenv.config();

// Initialize the Express app

const app = express();

// Set the port to either the environment variable PORT or default to 3000

const PORT = process.env.PORT || 3001;

// Set up Handlebars as the template engine with any custom helpers

const handleBars = expressHandlebars.create({ helpers }); 

// Set up session management

const sess = {
  secret: process.env.SESSION_SECRET,  // Use secret stored in .env for security
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: db.sequelize  // Store sessions in the PostgreSQL database using Sequelize
  })
};

// Use session middleware

app.use(session(sess));

// Set Handlebars as the view engine

app.engine('handlebars', handleBars.engine);  
app.set('view engine', 'handlebars');

// Middleware to parse incoming requests with JSON payloads

app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads

app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory 

app.use(express.static(path.join(__dirname, 'public')));

// Use routes from the controllers folder

app.use(routes);

// Sync Sequelize models and start the server

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
