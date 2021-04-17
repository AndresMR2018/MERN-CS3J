const mongoose = require('mongoose');

const JugadorSchema = new mongoose.Schema({

    cedula:{
        type:String,
        unique:true,
        maxLength:10,
        required:true,
        trim:true
    },

    nombres:{
        type:String,
        unique:false,
        minLength:1,
        maxLength:40,
        required:true,
        trim:true
    },

    apellidos:{
        type:String,
        unique:false,
        minLength:1,
        maxLength:40,
        required:true,
        trim:true
    },

    fecha_nacimiento:{
        type:Date,
        unique:false,
        required:true
    },

    origen:{
        type:String,
        minLength:1,
        maxLength:25,
        required:true,
        trim:true
    },

    estatura:{
        type:Number,
        unique:false,
        required:true,
        min:1,
        max:200,

    },

    posicion:{
        type:String,
        unique:false,
        minLength:1,
        maxLength:25,
        required:true,
        trim:true
    },

    fortaleza:{
        type:String,
        unique:false,
        minLength:0,
        maxLength:50,
        required:false,
        trim:true
    },

    iscapitan:{
        type:Boolean
    },

    observacion:{
        type:String,
        minLength:0,
        maxLength:500,
        required:false,
        trim:true
    },

    photo:{
        data: Buffer,
        contentType: String
    }

},
{timestamps:true}

);

module.exports = mongoose.model("Jugador",JugadorSchema);