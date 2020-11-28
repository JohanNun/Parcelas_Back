const router = require('express').Router();

const apiUsuariosRouter = require('./api/usuarios');
const apiParcelasRouter = require('./api/parcelas');


router.use('/usuarios', apiUsuariosRouter);
router.use('/parcelas', apiParcelasRouter);


module.exports = router; 