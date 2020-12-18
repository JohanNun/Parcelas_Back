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
        db.query('SELECT m.*, u.nombre_usuario as nombre_usuario_manda, (select nombre_usuario FROM huerto.usuarios WHERE id = fk_usuario_recibe) as nombre_usuario_recibe FROM huerto.mensajes as m, huerto.usuarios as u WHERE m.fk_usuario_manda = ? AND u.id = fk_usuario_manda;', [pFkUsuarioManda], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



const getMensajeByRecibidorId = (pFkUsuarioRecibe) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT m.*, u.nombre_usuario as nombre_usuario_recibe, (select nombre_usuario FROM huerto.usuarios WHERE id = fk_usuario_manda) as nombre_usuario_manda FROM huerto.mensajes as m, huerto.usuarios as u WHERE m.fk_usuario_recibe = ? AND u.id = fk_usuario_recibe', [pFkUsuarioRecibe], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



const getAllConversaciones = (idUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT *, (SELECT nombre_usuario FROM usuarios WHERE id = usuario1) as nombre_usuario_1, (SELECT imagen FROM usuarios WHERE id = usuario1) as imagen_1, (SELECT nombre_usuario FROM usuarios WHERE id = usuario2) as nombre_usuario_2, (SELECT imagen FROM usuarios WHERE id = usuario2) as imagen_2 FROM huerto.conversaciones WHERE usuario1 = ? OR usuario2 = ?', [idUsuario, idUsuario], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



const getMensajesByConversacion = (idConversacion) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT mensajes.* FROM huerto.mensajes WHERE fk_conversacion = ?', [idConversacion], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows);
        })
    })
}


const getConversacionById = (pIdConversacion) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT *, (SELECT nombre_usuario FROM usuarios WHERE id = usuario1) as nombre_usuario_1, (SELECT imagen FROM usuarios WHERE id = usuario1) as imagen_1, (SELECT nombre_usuario FROM usuarios WHERE id = usuario2) as nombre_usuario_2, (SELECT imagen FROM usuarios WHERE id = usuario2) as imagen_2 FROM huerto.conversaciones WHERE id = ?', [pIdConversacion], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}





//Post mensaje
const create = ({ texto }, pIdUsuario, pIdConversacion) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO mensajes (texto, fk_usuario_id, fk_conversacion) VALUES (?, ?, ?)', [texto, pIdUsuario, pIdConversacion], (error, result) => {
            if (error) reject(error);
            resolve(result)
        })
    })
}


const createConversacion = (pUsuario1, pUsuario2) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO conversaciones (usuario1, usuario2) VALUES (?, ?)', [pUsuario1, pUsuario2], (error, result) => {
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
    getAll, getById, getMensajeBySenderId, getMensajeByRecibidorId, create, deleteById, getMensajesByConversacion, getAllConversaciones, getConversacionById, createConversacion
}