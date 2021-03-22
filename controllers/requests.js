const Request = require('../models/request');
const User = require('../models/user');
const { response } = require('express');

const getRequest = async (req, res) => {

    const requests = await Request.find();

    res.json({ 
        ok:true, 
        requests
    })
}

const getRequestByIdUser = async (req, res) => {

    const id = req.params.id;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {

        return res.status(400).json({
            ok:false,
            msg: 'El identificador de usuario es incorrecto'
        }) 
        
    }

    const requests = await Request.find({user: id});

    res.json({ 
        ok:true, 
        requests
    })
}

const payRequest = async (req, res) => {

    const id = req.params.id;
    
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {

        return res.status(400).json({
            ok:false,
            msg: 'Solicitud Invalida'
        }) 
        
    }

    const request = await Request.findById(id);

    if(!request) {
        return res.status(400).json({
            ok:false,
            msg: 'Solicitud sin realizar'
        });
    }

    if(request.pago == true) {
        return res.status(400).json({
            ok:false,
            msg: 'La Solicitud ya se encuentra paga'
        });
    }

    request.pago = true;
    request.save();

    res.json({ 
        ok:true, 
        request,
        msg: 'La solicitud se pago correctamente'
    })
}

const createRequest = async (req, res = response) => {

    const { valor, usuarioId, fechaPagar } = req.body;

    try {

        const user = await User.findById(usuarioId);
        
        if( !user ) {
            return res.status(400).json({
                ok:false,
                msg: 'El Usuario es incorrecto'
            }) 
        }

        if(!await requestWithoutPaying(user)){
            return res.status(400).json({
                ok:false,
                msg: 'Solicitud rechazada, Actualmente tiene una solicitud sin pagar'
            }); 
        }


        let estado = Math.floor(Math.random() * (2)) == 1;

        if(user.valido != null) {
            
            if(user.valido == true) {
                estado = true;
            } else {
                return res.status(400).json({
                    ok:false,
                    msg: 'Solicitud rechazada'
                }); 
            }

        }

        const requestGenerate =  {
            valor,
            fechaPagar,
            estado: estado,
            user,
        }

        const request = new Request (requestGenerate);
        await request.save();

        if(requestGenerate.estado == false) {
            user.valido = false;
        } else {
            user.valido = true;
        }

        await user.save();

        res.json({ 
            ok:true, 
            request,
            msg: 'Solicitud Aprobada' 
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }

}

const requestWithoutPaying = async (user) => {

    const requests = await Request.find({user});

    let response = true;

    if(!requests.isEmpy){
        requests.forEach(request => {
            if(!request.pago) {
                response = false;
            }
        });
    }

    return response;
}


module.exports = {
    getRequest,
    createRequest,
    getRequestByIdUser,
    payRequest,
}