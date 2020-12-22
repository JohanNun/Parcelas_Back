const router = require('express').Router();
const { getAllParcelas, getById, create, update, deleteById, selectByPrecioUp, selectByPrecioDown, selectByTamano, getByCiudad, getParcelaByUsuarioId, getParcelaByUserName } = require('../../models/parcela')
const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'google',

    // Optional depending on the providers

    apiKey: 'AIzaSyBXoe3vvdGGosbpLVZqUncQDgiW4UAbl58', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};


//Metodo getAll() - GET
router.get('/', async (req, res) => {

    try {
        const rows = await getAllParcelas();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }

})


router.get('/precioAsc', async (req, res) => {

    try {
        const rows = await selectByPrecioUp();
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }

})


router.get('/precioDesc', async (req, res) => {

    try {
        const rows = await selectByPrecioDown();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }

})


router.get('/tamanoDesc', async (req, res) => {

    try {
        const rows = await selectByTamano();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
})


router.get('/:ciudad', async (req, res) => {
    const ciudad = req.params.ciudad;
    try {
        const rows = await getByCiudad(ciudad);
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
})


router.get('/parcela/:idParcela', async (req, res) => {
    const idParcela = req.params.idParcela;
    try {
        const rows = await getById(idParcela);
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message });
    }
})



router.get('/user/:idUsuario', async (req, res) => {
    const usuario = req.params.idUsuario;

    try {
        const rows = await getParcelaByUsuarioId(usuario);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }
})




router.get('/user/parcela/:userName', async (req, res) => {
    const usuario = req.params.userName;

    try {
        const rows = await getParcelaByUserName(usuario);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message })
    }
})



//Metodo create() - POST

router.post('/', async (req, res) => {
    try {
        const geocoder = NodeGeocoder(options);
        const position = await geocoder.geocode(req.body.calle);

        req.body.latitude = position[0].latitude;
        req.body.longitude = position[0].longitude;
        console.log(req.body);

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
        const result = await update(req.body.id, req.body);
        console.log(result);
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