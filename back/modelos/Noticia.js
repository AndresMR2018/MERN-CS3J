const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema(
{
    titulo:{
        type:String,
        trim:true,
        require:true,
        maxlength:500,
        unique:false
    },

    subtitulo:{
        type:String,
        trim:true,
        require:true,
        maxlength:500,
        unique:false
    },

    fuente:{
        type:String,
        trim:true,
        require:true,
        maxlength:1000,
        unique:false
    },

photo:{
    data:Buffer,
    contentType:String
},
    contenido:{
        type:String,
        trim:true,
        require:true,
        maxlength:5000,
        unique:false
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Noticia", noticiaSchema);