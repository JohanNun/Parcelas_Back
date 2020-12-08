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
        db.query('SELECT * FROM huerto.parcela WHERE id = ?', [pIdParcela], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}


/* crear una parcela */

const create = ({ titulo, localizacion, tamano_total, tamano_disponible, precio_metro, descripcion, images }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO huerto.parcela (titulo, localizacion, tamano_total, tamano_disponible, precio_metro, descripcion, images) VALUES (?, ?, ?, ?, ?, ?, ?)', [titulo, localizacion, tamano_total, tamano_disponible, precio_metro, descripcion, images], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}

//Actualizar parcela por id
const updateById = (pIdParcela, { titulo, localizacion, tamano_total, tamano_disponible, precio_metro, descripcion, images }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE parcela SET titulo = ?, localizacion = ?, tamano_total = ?, tamano_disponible = ?, precio_metro = ?, descripcion = ?, images = ? WHERE id = ?', [titulo, localizacion, tamano_total, tamano_disponible, precio_metro, descripcion, images, pIdParcela], (error, result) => {
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


module.exports = { getAllParcelas, getById, create, updateById, deleteById, selectByPrecioUp, selectByPrecioDown, selectByTamano }