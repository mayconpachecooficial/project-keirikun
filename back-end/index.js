import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import rout from './routs/Routes';

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', rout);
app.use('/ejs', rout);
app.use('/member', rout);
app.use('/mailer', rout);
app.use('/img', rout);
app.use('/pdf', rout);
app.use('/list', rout);
app.use('/listUpdate', rout);
app.use('/listDelete', rout);
app.use('/calender', rout);
app.use('/calenderteste', rout);
app.use('/calender/entrance', rout);
app.use('/registerEntrance', rout);
app.use('/pass', rout);
app.use('/planget', rout);
app.use('/lesson_after/:id', rout);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
