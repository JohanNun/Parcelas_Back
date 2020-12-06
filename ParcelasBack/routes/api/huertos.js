const router = require('express').Router();
const { getAll, getById } = require('../../models/huerto');


router.get('/', async (req, res) => {

    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
})



router.get('/:idHuerto', async (req, res) => {

    try {
        const idHuerto = req.params.idHuerto;

        const rows = await getById(idHuerto);
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
})


module.exports = router; 