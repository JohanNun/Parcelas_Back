const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM trozos', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM trozos WHERE id = ?', [pId], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}





const getByParcelaId = (pFkParcela) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM trozos WHERE fk_parcela = ?', [pFkParcela], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



const getByUsuarioId = (pFkUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM trozos WHERE fk_usuario = ?', [pFkUsuario], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const getTrozosDelUsuario = (pFkUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT(fk_parcela) FROM trozos WHERE fk_usuario = ?', [pFkUsuario], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



const reservar = ({ tamano }, pFkParcela, pFkUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO trozos (tamano, fk_parcela, fk_usuario) VALUES (?, ?, ?)', [tamano, pFkParcela, pFkUsuario], (error, result) => {
            if (error) reject(error);
            resolve(result)
        })
    })
}



const cancel = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM trozos WHERE id = ?', [pId], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}



const dataParcela = (pIdUsuario, pIdParcela) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT p.titulo, p.images, p.calle, SUM(tamano) from trozos t, parcela p WHERE t.fk_parcela = ? AND t.fk_usuario = ? AND t.fk_parcela = p.id', [pIdParcela, pIdUsuario], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null)
            resolve(rows[0]);
        })
    })
}



module.exports = {
    getAll, getById, getByParcelaId, getByUsuarioId, reservar, cancel, getTrozosDelUsuario, dataParcela
}