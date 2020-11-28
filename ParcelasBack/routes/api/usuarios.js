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

    try {
        const result = await create(req.body);
        if (result.affectedRows === 1) {
            const nuevoUsuario = await getById(result.insertId)
            res.json(nuevoUsuario);
        }
    } catch (error) {
        res.json({ error: 'No se ha podido agregar el usuario' })
    }
})




module.exports = router; 