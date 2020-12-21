const router = require('express').Router();
const { checkToken } = require('../middleware');
const { getAll, getById, getByParcelaId, getByUsuarioId, reservar, cancel } = require('../../models/trozo');

router.get('/', async (req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
})



router.get('/parcela/:idParcela', async (req, res) => {
    const parcelaId = req.params.idParcela;

    try {
        const rows = await getByParcelaId(parcelaId);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }
})




router.get('/user/:idUsuario', async (req, res) => {
    const usuarioId = req.params.idUsuario;

    try {
        const rows = await getByUsuarioId(usuarioId);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }
})




router.post('/nuevo_trozo/:idParcela', [checkToken], async (req, res) => {
    console.log(req.body);
    const result = await reservar(req.body, req.params.idParcela, req.user.id);

    try {
        if (result.affectedRows === 1) {
            const nuevoTrozo = await getById(result.insertId)
            res.json(nuevoTrozo);
        } else {
            res.json({ error: 'No se ha podido reservar el trozo' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})




router.delete('/:idTrozo', [checkToken], async (req, res) => {

    try {
        const result = await cancel(req.params.idTrozo);
        if (result.affectedRows === 1) {
            res.json('Se ha cancelado el vínculo');
        } else {
            res.json({ error: 'El vínculo no se ha podido cancelar' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})


module.exports = router; 