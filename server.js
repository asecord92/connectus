const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = exphbs.create();
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' , 
layoutsDir: __dirname + '/views/layouts/',
partialsDir: __dirname + '/views/partials/'}));
app.set('view engine', 'handlebars');


// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Data
// =============================================================
const buttons = [
  {
    name: 'my-events',
    description: 'Events I created'
  },
  {
    name: 'today',
    description: 'Today'
  }
];

// Routes
// =============================================================

app.get('/', (req, res) => {
  const data = {
    filter: buttons
  };
  res.render('index', data);
});