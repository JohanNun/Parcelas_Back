
//Recuperar todos los huertos
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huertoscomunitarios', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


// Recuperar un solo huerto
const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huertoscomunitarios WHERE id = ?', [pId], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}



module.exports = {
    getAll, getById
}