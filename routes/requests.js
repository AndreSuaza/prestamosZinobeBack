const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields } =  require('../middlewares/validate-fields')

const { getRequest , createRequest, getRequestByIdUser, payRequest } = require('../controllers/requests')
const router = Router();

router.get( '/', getRequest );
router.get( '/:id', getRequestByIdUser );
router.get( '/pay/:id', payRequest );
router.post( '/', 
    [
       check('valor', 'El Valor es obligatorio').not().isEmpty(),
       check('usuarioId', 'El Usuario es obligatorio').not().isEmpty(),
       validateFields,
    ] , 
    createRequest );


module.exports = router;