const router = require('express').Router();
const { getAll, getByName } = require('../../models/cultivo');


router.get('/', async (req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
})



router.get('/:idNombre', async (req, res) => {

    try {
        const nombre = req.params.idNombre;

        const rows = await getByName(nombre);
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
})



module.exports = router; 