const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

//Init middleware
//app.use(logger);

//handlebar middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Homepage Rotue
app.get('/', (req, res) => res.render('index', {
    title: 'Members App',
    members
}));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));