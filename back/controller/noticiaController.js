const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Noticia = require('../modelos/Noticia');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : 'titulo'

  Noticia.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, noticias) => {
      if (err) {
        return res.status(400).json({
          error: "Noticia not found"
        })
      }
      res.json(noticias);
    })
}

exports.read = (req, res) => {
  req.noticia.photo = undefined;
  return res.json(req.noticia);
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

    const {titulo, subtitulo, fuente, contenido} = fields
    let noticia = new Noticia(fields);

    // 1KB = 1000 bytes
    // 1MB = 1,000,000 bytes 
    // 1 Byte = 8 bits

    if (files.photo) {
      if (files.photo.size > 100000000) {
        return res.status(400).json({
          error: "Image should be lass than 1MB in size"
        })
      }
      noticia.photo.data = fs.readFileSync(files.photo.path)
      noticia.photo.contentType = files.photo.type
    }

    noticia.save((err, result) => {
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
  let noticia = req.noticia
  noticia.remove((err, deletedNoticia) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      message: "Noticia was deleted succesfully"
    })
  })
}

exports.noticiaById = (req, res, next, id) => {
  Noticia.findById(id)
    .exec((err, noticia) => {
      if (err || !noticia) {
        return res.status(400).json({
          error: "Noticia not found"
        });
      }
      req.noticia = noticia;
      next();
    })
}

exports.photo = (req, res, next ) => {
  if (req.noticia.photo.data) {
    res.set('Content-Type', req.noticia.photo.contentType)
    return res.send(req.noticia.photo.data)
  }
  next();
}