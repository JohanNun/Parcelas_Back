//Metodo getAllParcelas() - GET

const getAllParcelas = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huerto.parcela', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}

//Metodo getById()
const getById = (pIdParcela) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT *, tamano_disponible - (SELECT sum(tamano) FROM trozos WHERE fk_parcela = 1) as trozo_disponible FROM huerto.parcela WHERE id = ?', [pIdParcela], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}


/* crear una parcela */

const create = ({ titulo, tamano_total, tamano_disponible, precio_metro, calle, CP, ciudad, descripcion, images, fk_usuario }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO huerto.parcela (titulo, tamano_total, tamano_disponible, precio_metro, calle, CP, ciudad, descripcion, images, fk_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [titulo, tamano_total, tamano_disponible, precio_metro, calle, CP, ciudad, descripcion, images, fk_usuario], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}

//Actualizar parcela por id
const update = (pIdParcela, { titulo, calle, CP, ciudad, tamano_total, tamano_disponible, precio_metro, descripcion, images, fk_usuario }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE parcela SET titulo = ?, calle = ?, CP = ?, ciudad = ?, tamano_total = ?, tamano_disponible = ?, precio_metro = ?, descripcion = ?, images = ?, fk_usuario = ? WHERE id = ?', [titulo, calle, CP, ciudad, tamano_total, tamano_disponible, precio_metro, descripcion, images, fk_usuario, pIdParcela], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}

//Borra parcela por id
const deleteById = (pIdParcela) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM parcela WHERE id = ?', [pIdParcela], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}


const selectByPrecioUp = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM parcela ORDER BY precio_metro ASC', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const selectByPrecioDown = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM parcela ORDER BY precio_metro DESC', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const selectByTamano = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huerto.parcela ORDER BY tamano_disponible DESC', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const getByCiudad = (pCiudad) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huerto.parcela WHERE ciudad = ?', [pCiudad], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const getParcelaByUsuarioId = (pIdUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huerto.parcela WHERE parcela.fk_usuario = ?', [pIdUsuario], (error, rows) => {
            if (error) reject(error);
            /* if (rows.length === 0) resolve(null); */
            resolve(rows);
        })
    })
}



const getParcelaByUserName = (pUserName) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huerto.parcela WHERE fk_usuario = (select usuarios.id FROM usuarios WHERE nombre_usuario = ?)', [pUserName], (error, rows) => {
            if (error) reject(error);
            /* if (rows.length === 0) resolve(null); */
            resolve(rows);
        })
    })
}



module.exports = { getAllParcelas, getById, create, update, deleteById, selectByPrecioUp, selectByPrecioDown, selectByTamano, getByCiudad, getParcelaByUsuarioId, getParcelaByUserName }