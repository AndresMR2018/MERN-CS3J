const mongoose = require('mongoose');

const DirigenteSchema = new mongoose.Schema({

    cedula:{
        type:String,
        unique:true,
        minLength:1,
        maxLength:10,
        required:true,
        trim:true
    },

    nombres:{
        type:String,
        unique:false,
        minLength:1,
        maxLength:30,
        required:true,
        trim:true
    },

    apellidos:{
        type:String,
        unique:false,
        minLength:1,
        maxLength:30,
        required:true,
        trim:true
    },

    fecha_nacimiento:{
        type:Date,
        required:true
    },

    cargo:{
        type:String,
        unique:false,
        minLength:1,
        maxLength:25,
        required:true,
        trim:true
    },

    fecha_ingreso:{
        type:Date,
        required:true,
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

module.exports = mongoose.model("Dirigente",DirigenteSchema);