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



const getNombreUsuarioByfkRecibe = (pFkUsuarioRecibe) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, u.nombre_usuario FROM huerto.mensajes as m, huerto.usuarios as u WHERE m.fk_usuario_recibe = ? AND u.id = fk_usuario_recibe;', [pFkUsuarioRecibe], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const getNombreUsuarioByfkManda = (pFkUsuarioManda) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, u.nombre_usuario FROM huerto.mensajes as m, huerto.usuarios as u WHERE m.fk_usuario_manda = ? AND u.id = fk_usuario_manda;', [pFkUsuarioManda], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



//Post mensaje
const create = ({ texto }, pIdUsuarioManda, pIdUsuarioRecibe) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO mensajes (texto, fk_usuario_manda, fk_usuario_recibe) VALUES (?, ?, ?)', [texto, pIdUsuarioManda, pIdUsuarioRecibe], (error, result) => {
            if (error) reject(error);
            resolve(result)
        })
    })
}



//Borrar mensaje
const deleteById = (pIdMensaje) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM mensajes WHERE id = ?', [pIdMensaje], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}





module.exports = {
    getAll, getById, getMensajeBySenderId, getMensajeByRecibidorId, create, deleteById, getNombreUsuarioByfkRecibe, getNombreUsuarioByfkManda
}