const router = require('express').Router();
const { getAllParcelas, getById, create } = require('../../models/parcela')


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

//Metodo deleteById() - DELETE

module.exports = router; 