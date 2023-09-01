const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');
const { dbConnection } = require('./database');
 
// Initializations
const app = express();

// Database
dbConnection();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // __dirname + '/views/layouts'
    partialsDir: path.join(app.get('views'), 'partials'), // __dirname + '/views/partials'
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false})); //para entender los datos que envia el formulario
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'), //directorio donde se guardan las imagenes
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname)); //nombre de la imagen
    }
});
app.use(multer({ storage }).single('image'));

// Routes
app.use(require('./routes'));

module.exports = app;