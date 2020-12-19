const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cultivos', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



const getByName = (pNombre) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cultivos WHERE nombre LIKE ?', [pNombre], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}


module.exports = {
    getAll, getByName
}