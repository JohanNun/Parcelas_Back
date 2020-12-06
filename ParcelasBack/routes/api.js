const router = require('express').Router();

const apiUsuariosRouter = require('./api/usuarios');
const apiParcelasRouter = require('./api/parcelas');
const apiHuertosRouter = require('./api/huertos');
const { checkToken } = require('./middleware');


router.use('/usuarios', /* checkToken */ apiUsuariosRouter);
router.use('/parcelas', /* checkToken, */ apiParcelasRouter);
router.use('/huertos', apiHuertosRouter);


module.exports = router; 