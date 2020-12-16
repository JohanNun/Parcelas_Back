const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM mensajes', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const getById = (pIdMensaje) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM mensajes WHERE id = ?', [pIdMensaje], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}


//Get mensajes del usuario que manda mensajes (mis mensajes)
const getMensajeBySenderId = (pFkUsuarioManda) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, u.nombre_usuario FROM huerto.mensajes as m, huerto.usuarios as u WHERE m.fk_usuario_manda = ? and m.fk_usuario_manda = u.id;', [pFkUsuarioManda], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



const getMensajeByRecibidorId = (pFkUsuarioRecibe) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, u.nombre_usuario FROM huerto.mensajes as m, huerto.usuarios as u WHERE m.fk_usuario_recibe = ? and m.fk_usuario_recibe = u.id;', [pFkUsuarioRecibe], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const creat = () => {
    return new Promise((resolve, reject) => {
        db.query('')
    })
}






module.exports = {
    getAll, getById, getMensajeBySenderId, getMensajeByRecibidorId
}