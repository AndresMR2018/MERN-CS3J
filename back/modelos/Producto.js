const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({

    categoria_producto: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 30,
        trim: true
    },

    categoria_persona: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 30,
        trim: true
    },

    nombre: {
        type: String,
        unique: false,
        trim: true,
        maxLenght: 40,
        minLength: 1,
        required: true
    },

    marca: {
        type: String,
        unique: false,
        required: true,
        trim: true,
        maxLength: 30,
        minLength: 1
    },

    color: {
        type: String,
        unique: false,
        trim: true,
        maxLength: 30,
        minLength: 1,
        required: true
    },

    descripcion: {
        type: String,
        unique: false,
        trim: true,
        MaxLength: 250,
        minLength: 1,
        required: true
    },

    precio: {
        type: Number,
        unique: false,
        min: 0,
        max: 1000
    },

    cantidad: {
        type: Number,
        unique: false,
        min: 0,
        max: 1000
    },

    photo: {
        data: Buffer,
        contentType: String
    },


},

{timestamps:true}

);

module.exports = mongoose.model("Producto", ProductoSchema);