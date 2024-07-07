const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 3000;;
var routes = require('./routes/Routes');
const signupRouter = require('./routes/ noauth/signup.router');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));

app.use(cors());

 app.use(bodyParser.json());
 // Express modules / packages

 app.use(bodyParser.urlencoded({ extended: true }));
 // Express modules / packages

app.use('/', routes);
app.use('/ejs', routes);
app.use('/member', routes);
app.use('/mailer', routes);
app.use('/img', routes);
app.use('/pdf', routes);
app.use('/list', routes);
app.use('/listUpdate', routes);
app.use('/listDelete', routes);
app.use('/calender', routes);
app.use('/calenderteste', routes);
app.use('/calender/entrance', routes);
app.use('/registerEntrance', routes);
app.use('/pass', routes);
app.use('/planget', routes);
app.use('/lesson_after/:id', routes);

app.use('/noauth', signupRouter)

app.listen(port, () => { // Listen on port 3000
    console.log(`Listening! in port: ${port}`); // Log when listen success
});
