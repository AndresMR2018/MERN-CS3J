const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
require('dotenv').config();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());//opcion deprecada bodyparser.json()
app.use(cors());
//SETTTINGS
app.set('port', process.env.PORT || 5000);
// Database setup
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true})
.then(() => { console.log("Base de datos conectada")});

//RUTAS
app.use('/api/producto',require('./rutas/producto'));
app.use('/api/noticia',require('./rutas/noticia'));
app.use('/api/jugador', require('./rutas/jugador'));
app.use('/api/dirigente',require('./rutas/dirigente'));
app.use('/api/auth', require('./rutas/auth'));


// Listen to Port
app.listen(app.get('port'), () => {
  console.log(`Servidor de express esta ejecutando en el puerto ${app.get('port')}`);
})


  