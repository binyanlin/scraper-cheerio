const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');
// const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use(routes);
app.listen(PORT, function() {
  console.log('server listening on http://localhost:' + PORT);
});
