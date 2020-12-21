const router = require('express').Router();

const apiUsuariosRouter = require('./api/usuarios');
const apiParcelasRouter = require('./api/parcelas');
const apiHuertosRouter = require('./api/huertos');
const apiComentariosRouter = require('./api/comentarios');
const apiMensajesRouter = require('./api/mensajes');
const apiCultivosRouter = require('./api/cultivos');
const apiTrozos = require('./api/trozos');
const { checkToken } = require('./middleware');


router.use('/usuarios', apiUsuariosRouter);
router.use('/parcelas', apiParcelasRouter);
router.use('/huertos', apiHuertosRouter);
router.use('/comentarios', apiComentariosRouter);
router.use('/mensajes', checkToken, apiMensajesRouter);
router.use('/cultivos', apiCultivosRouter);
router.use('/trozos', checkToken, apiTrozos);


module.exports = router; 