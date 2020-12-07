//Metodo getAllParcelas() - GET

const getAllParcelas = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huertos.parcela', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}

//Metodo getById()
const getById = (pIdParcela) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huertos.parcela WHERE id = ?', [pIdParcela], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}


/* crear una parcela */

const create = ({ localizacion, tamaño_total, tamaño_disponible, precio_metro, descripcion, images }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (localizacion, tamaño_total, tamaño_disponible, precio_metro, descripcion, images) VALUES (?, ?, ?, ?, ?, ?)', [localizacion, tamaño_total, tamaño_disponible, precio_metro, descripcion, images], (error, result) => {
            if (error) reject(error);
            resolve(result)
        })
    })
}


module.exports = { getAllParcelas, getById, create }