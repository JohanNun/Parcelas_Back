const router = require('express').Router();
const { getAll, getById, create, updateById, deleteById, getComentariosByUsuarioId, getComentariosByParcelaId } = require('../../models/comentario');


router.get('/', async (req, res) => {

    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }

})

router.get('/:idComentario', async (req, res) => {
    const idComentario = req.params.idComentario;
    try {
        const rows = await getById(idComentario);
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message });
    }
})

router.get('/user/:idUsuario', async (req, res) => {
    const usuario = req.params.idUsuario;

    try {
        const rows = await getComentariosByUsuarioId(usuario);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.get('/parcela/:idParcela', async (req, res) => {
    const parcela = req.params.idParcela;

    try {
        const rows = await getComentariosByParcelaId(parcela);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }
})



router.post('/nuevo_comentario', async (req, res) => {
    console.log(req.body);
    try {
        const result = await create(req.body);
        if (result.affectedRows === 1) {
            const nuevoComentario = await getById(result.insertId)
            res.json(nuevoComentario);
        } else {
            res.json({ error: 'No se ha podido añadir el comentario' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.put('/', async (req, res) => {

    try {
        const result = await updateById(req.body.idComentario, req.body);
        if (result.affectedRows === 1) {
            const ComentarioActualizado = await getById(req.body.idComentario)
            res.json({
                mensaje: 'El comentario se ha actualizado',
                comentario: ComentarioActualizado
            });
        } else {
            res.json({ error: 'No se ha podido actualizar el comentario' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})


router.delete('/:idComentario', async (req, res) => {

    try {
        const result = await deleteById(req.params.idComentario);
        if (result.affectedRows === 1) {
            res.json({ mensaje: 'El comentario se ha borrado' })
        } else {
            res.json({ error: 'El comentario no se ha podido borrar' })
        }

    } catch (error) {
        res.json({ error: error.message });
    }
})



module.exports = router; 