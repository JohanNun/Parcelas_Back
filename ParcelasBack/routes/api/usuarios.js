const router = require('express').Router();
const { getAll, getById, create, updateById, deleteById, getByEmail } = require('../../models/usuario');
const bcrypt = require('bcryptjs');
const webTok = require('jsonwebtoken');
const daysJs = require('dayjs');


/* GET query */

router.get('/', async (req, res) => {

    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }

})


router.get('/:id', async (req, res) => {

    const id = req.params.id;
    try {
        const rows = await getById(id);
        res.json(rows)
    } catch (error) {
        res.json({ error: error.message });
    }
})




/* POST queries */


// Crear/Registrar un usuario
router.post('/', async (req, res) => {
    console.log(req.body);
    try {

        req.body.password = bcrypt.hashSync(req.body.password, 10);
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



//Login de un usuario
router.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        //Compruebo que el email existe
        const usuario = await getByEmail(email);

        if (!usuario) {
            return res.json({ error: 'Error en el email y/o contraseña' });
        }
        //Compruebo que la contraseña existe y es igual a la introducida
        const iguales = bcrypt.compareSync(password, usuario.password);
        console.log(password, usuario.password);
        if (!iguales) {
            return res.json({ error: 'Error en el email y/o contraseña' });
        }

        //Si email y password existen, creo un token
        res.json({
            success: "LOGIN CORRECTO",
            token: createToken(usuario),
            imagen: usuario.imagen
        });

    } catch (error) {
        res.json({ error: error.message });
    }

})



//Funcion para generar un token
function createToken(pUsuario) {
    const objeto = {
        idUsuario: pUsuario.id,
        caducidad: daysJs().add(6, 'week').unix()
    };
    return webTok.sign(objeto, process.env.SECRET_KEY);
}






/* PUT query */


//Actualizar un usuario
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




/* DELETE query */

//Borrar un usuario
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