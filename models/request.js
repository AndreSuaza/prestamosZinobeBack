const { Schema, model } = require('mongoose');

const RequestSchema = Schema({

    valor: {
        type: Number,
        required: true
    },
    fechaPagar: {   
        type: Date,
    },
    estado: {
        type: Boolean,
        required: true,
    },
    pago: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Request', RequestSchema);