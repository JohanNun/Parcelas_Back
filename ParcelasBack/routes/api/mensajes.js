const router = require('express').Router();
const { checkToken } = require('../middleware');
const { getAll, getById, getMensajeBySenderId, getMensajeByRecibidorId, create, deleteById, getAllConversaciones, getConversacionById, getMensajesByConversacion } = require('../../models/mensaje');


//Recibir todos los mensaje
router.get('/', async (req, res) => {

    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }

})



router.get('/conversacion', [checkToken], async (req, res) => {

    try {
        const rows = await getAllConversaciones(req.user.id);
        for (let row of rows) {
            const mensajes = await getMensajesByConversacion(row.id)
            row.mensajes = mensajes
        }
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message });
    }
})




router.get('/:idMensaje', async (req, res) => {
    const idMensaje = req.params.idMensaje;
    try {
        const rows = await getById(idMensaje);
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message });
    }
})





router.get('/user/:idUsuario', async (req, res) => {
    const usuarioManda = req.params.idUsuario;

    try {
        const rows = await getMensajeBySenderId(usuarioManda);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }
})



router.get('/userRecibe/:idUsuario', async (req, res) => {
    const usuarioRecibe = req.params.idUsuario;

    try {
        const rows = await getMensajeByRecibidorId(usuarioRecibe);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }
})





router.get('/conversacion/:idConversacion', async (req, res) => {
    const idConversacion = req.params.idConversacion;

    try {
        const conversacion = await getConversacionById(idConversacion);
        conversacion.mensajes = await getMensajesByConversacion(idConversacion);
        res.json(conversacion);
    } catch (error) {
        res.json({ error: error.message })
    }
})





router.post('/nuevo_mensaje/:idConversacion', [checkToken], async (req, res) => {
    console.log(req.user.id);
    try {
        const result = await create(req.body, req.user.id, req.params.idConversacion);
        console.log(result);
        if (result.affectedRows === 1) {
            const nuevoMensaje = await getById(result.insertId)
            res.json(nuevoMensaje);
        } else {
            res.json({ error: 'No se ha podido mandar el mensaje' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})



router.delete('/:idMensaje', [checkToken], async (req, res) => {

    try {
        const result = await deleteById(req.params.idMensaje);
        if (result.affectedRows === 1) {
            res.json({ mensaje: 'El mensaje se ha borrado' })
        } else {
            res.json({ error: 'El mensaje no se ha podido borrar' })
        }

    } catch (error) {
        res.json({ error: error.message });
    }
})


module.exports = router; 