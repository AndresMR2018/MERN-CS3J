const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Producto = require('../modelos/Producto');
const { errorHandler } = require('../helpers/dberrorHandler');

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc'
  let sortBy = req.query.sortBy ? req.query.sortBy : 'nombre'

  Producto.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, productos) => {
      if (err) {
        return res.status(400).json({
          error: "Productos not found"
        })
      }
      res.json(productos);
    })
}

exports.read = (req, res) => {
  req.producto.photo = undefined;
  return res.json(req.producto);
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

    const { categoria_producto,categoria_persona, nombre, marca, color, descripcion, precio, cantidad } = fields
    let producto = new Producto(fields);

    // 1KB = 1000 bytes
    // 1MB = 1,000,000 bytes 
    // 1 Byte = 8 bits

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be lass than 1MB in size"
        })
      }
      producto.photo.data = fs.readFileSync(files.photo.path)
      producto.photo.contentType = files.photo.type
    }

    producto.save((err, result) => {
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
  let producto = req.producto
  producto.remove((err, deletedProducto) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({
      message: "Producto was deleted succesfully"
    })
  })
}

exports.productoById = (req, res, next, id) => {
  Producto.findById(id)
    .exec((err, producto) => {
      if (err || !producto) {
        return res.status(400).json({
          error: "Producto not found"
        });
      }
      req.producto = producto;
      next();
    })
}

exports.photo = (req, res, next ) => {
  if (req.producto.photo.data) {
    res.set('Content-Type', req.producto.photo.contentType)
    return res.send(req.producto.photo.data)
  }
  next();
}