const router = require('express').Router();
const { getAllParcelas, getById, create, updateById, deleteById } = require('../../models/parcela')


//Metodo getAll() - GET
router.get('/', async (req, res) => {

    try {
        const rows = await getAllParcelas();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }

})

//Metodo create() - POST

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const result = await create(req.body);
        if (result.affectedRows === 1) {
            const nuevaParcela = await getById(result.insertId)
            res.json(nuevaParcela);
        } else {
            res.json({ error: 'No se ha podido añadir la parcela' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Metodo updateById() - PUT
//Actualizar parcela
router.put('/', async (req, res) => {

    try {
        const result = await updateById(req.body.idParcela, req.body);
        if (result.affectedRows === 1) {
            const parcelaActualizada = await getById(req.body.idParcela)
            res.json({
                mensaje: 'La parcela se ha actualizado',
                parcela: parcelaActualizada
            });
        } else {
            res.json({ error: 'No se ha podido actualizar la parcela' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Metodo deleteById() - DELETE
//Borrar una parcela

router.delete('/:idParcela', async (req, res) => {

    try {
        const result = await deleteById(req.params.idParcela);
        if (result.affectedRows === 1) {
            res.json({ mensaje: 'La parcela se ha borrado' })
        } else {
            res.json({ error: 'La parcela no se ha podido borrar' })
        }

    } catch (error) {
        res.json({ error: error.message });
    }
})

module.exports = router; 