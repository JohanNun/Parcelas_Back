const webTok = require('jsonwebtoken');
const daysJs = require('dayjs');
const { getById } = require('../models/usuario')

const checkToken = async (req, res, next) => {
    console.log(req.headers);
    if (!req.headers['authorization']) {
        return res.status(403).json({ error: 'Debes introducir el header Authorization' });
    }

    const token = req.headers['authorization'];
    const objeto = webTok.decode(token, process.env.SECRET_KEY);

    if (!objeto) {
        return res.status(403).json({ error: 'Token incorrecto' });
    }

    if (daysJs.unix() > objeto.caducidad) {
        return res.status(403).json({ error: 'El token ha caducado' });
    }

    //Si el usuario existe
    const usuario = await getById(objeto.idUsuario);
    if (!usuario) {
        return res.status(403).json({ error: 'El usuario no existe' });
    }


    req.user = usuario;


    next();


}

module.exports = {
    checkToken
}