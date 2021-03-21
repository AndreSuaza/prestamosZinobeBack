const User = require('../models/user');
const { response } = require('express');

const getUsers = async (req, res) => {

    const users = await User.find();

    res.json({ 
        ok:true, 
        users
    })
}


const createUsers = async (req, res = response) => {

    const { nombre, correo, cedula } = req.body;

    try {

        const validateEmail = await User.findOne({ correo });

        if( validateEmail ) {
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya esta registrado'
            }) 
        }

        const user = new User (req.body);
        await user.save();

        res.json({ 
            ok:true, 
            user
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }

}

module.exports = {
    getUsers,
    createUsers,
}