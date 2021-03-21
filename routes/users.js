const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields } =  require('../middlewares/validate-fields')

const { getUsers, createUsers } = require('../controllers/users')
const router = Router();

router.get( '/', getUsers );
router.post( '/', 
    [
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('correo', 'Correo invalido').isEmail(),
       check('cedula', 'La cedula es obligatorio').not().isEmpty(),
       validateFields,
    ] , 
    createUsers );


module.exports = router;