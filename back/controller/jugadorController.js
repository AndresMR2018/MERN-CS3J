const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Jugador = require('../modelos/Jugador');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : 'nombres'

  Jugador.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, jugador) => {
      if (err) {
        return res.status(400).json({
          error: "jugador not found"
        })
      }
      res.json(jugador);
    })
}

exports.read = (req, res) => {
  req.jugador.photo = undefined;
  return res.json(req.jugador);
}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }

    const {cedula, nombres, apellidos, fecha_nacimiento, origen, estatura, posicion, fortaleza, iscapitan, observacion} = fields
    let jugador = new Jugador(fields);

    // 1KB = 1000 bytes
    // 1MB = 1,000,000 bytes 
    // 1 Byte = 8 bits

    if (files.photo) {
      if (files.photo.size > 1000000000) {
        return res.status(400).json({
          error: "Image should be lass than 1MB in size"
        })
      }
      jugador.photo.data = fs.readFileSync(files.photo.path)
      jugador.photo.contentType = files.photo.type
    }

    jugador.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(result);
    })

  })
}

exports.remove = (req, res) => {
  let jugador = req.jugador
  jugador.remove((err, deletedJugador) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      message: "Jugador was deleted succesfully"
    })
  })
}

exports.jugadorById = (req, res, next, id) => {
    Jugador.findById(id)
    .exec((err, jugador) => {
      if (err || !jugador) {
        return res.status(400).json({
          error: "jugador not found"
        });
      }
      req.jugador = jugador;
      next();
    })
}

exports.photo = (req, res, next ) => {
  if (req.jugador.photo.data) {
    res.set('Content-Type', req.jugador.photo.contentType)
    return res.send(req.jugador.photo.data)
  }
  next();
}