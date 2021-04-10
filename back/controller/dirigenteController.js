const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Dirigente = require('../modelos/Dirigente');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : 'nombres'

  Dirigente.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, dirigente) => {
      if (err) {
        return res.status(400).json({
          error: "dirigente not found"
        })
      }
      res.json(dirigente);
    })
}

exports.read = (req, res) => {
  req.dirigente.photo = undefined;
  return res.json(req.dirigente);
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

    const {cedula, nombres, apellidos, fecha_nacimiento, cargo, fecha_ingreso, observacion} = fields
    let dirigente = new Dirigente(fields);

    // 1KB = 1000 bytes
    // 1MB = 1,000,000 bytes 
    // 1 Byte = 8 bits

    if (files.photo) {
      if (files.photo.size > 100000000) {
        return res.status(400).json({
          error: "Image should be lass than 1MB in size"
        })
      }
      dirigente.photo.data = fs.readFileSync(files.photo.path)
      dirigente.photo.contentType = files.photo.type
    }

    dirigente.save((err, result) => {
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
  let dirigente = req.dirigente
  dirigente.remove((err, deletedDirigente) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      message: "dirigente was deleted succesfully"
    })
  })
}

exports.dirigenteById = (req, res, next, id) => {
    Dirigente.findById(id)
    .exec((err, dirigente) => {
      if (err || !dirigente) {
        return res.status(400).json({
          error: "dirigente not found"
        });
      }
      req.dirigente = dirigente;
      next();
    })
}

exports.photo = (req, res, next ) => {
  if (req.dirigente.photo.data) {
    res.set('Content-Type', req.dirigente.photo.contentType)
    return res.send(req.dirigente.photo.data)
  }
  next();
}