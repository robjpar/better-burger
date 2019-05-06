const express = require('express');
const app = express();

// Server configuration
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Synchronize the models and start the server
const db = require("./models");
const port = process.env.PORT || 8080;
db.sequelize.sync({}).then(function() {
  app.listen(port, function() {
    console.log(`Server ${__filename} listening on port ${port}`);
  });
});
