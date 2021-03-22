const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    correo: {   
        type: String,
        required: true,
        unique: true 
    },
    cedula: {
        type: Number,
        required: true,
    },
    valido: {
        type: Boolean,
        default: null
    }

});

module.exports = model('User', UserSchema);