const router = require('express').Router();
const { getAll, getById, create, updateById, deleteById } = require('../../models/usuario');


router.get('/', async (req, res) => {

    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }

})




router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const result = await create(req.body);
        if (result.affectedRows === 1) {
            const nuevoUsuario = await getById(result.insertId)
            res.json(nuevoUsuario);
        } else {
            res.json({ error: 'No se ha podido agregar el usuario' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})




router.put('/', async (req, res) => {

    try {
        const result = await updateById(req.body.idUsuario, req.body);
        if (result.affectedRows === 1) {
            const usuarioActualizado = await getById(req.body.idUsuario)
            res.json({
                mensaje: 'El usuario se ha actualizado',
                usuario: usuarioActualizado
            });
        } else {
            res.json({ error: 'No se ha podido modificar el usuario' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})





//Borrar un cliente
router.delete('/:idUsuario', async (req, res) => {

    try {
        const result = await deleteById(req.params.idUsuario);
        if (result.affectedRows === 1) {
            res.json({ mensaje: 'El usuario se ha borrado' })
        } else {
            res.json({ error: 'El usuario no se ha podido borrar' })
        }

    } catch (error) {
        res.json({ error: error.message });
    }
})



module.exports = router; 