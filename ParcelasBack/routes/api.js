const router = require('express').Router();

const apiUsuariosRouter = require('./api/usuarios');
const apiParcelasRouter = require('./api/parcelas');
const { checkToken } = require('./middleware');


router.use('/usuarios', /* checkToken */ apiUsuariosRouter);
router.use('/parcelas', /* checkToken, */ apiParcelasRouter);


module.exports = router; 