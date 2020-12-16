const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM comentarios', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}


const getById = (pIdComentario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM comentarios WHERE id = ?', [pIdComentario], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}



const getComentariosByUsuarioId = (pIdUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT c.*, u.nombre_usuario FROM huerto.comentarios as c, huerto.usuarios as u WHERE c.fk_usuario = ? and c.fk_usuario = u.id;', [pIdUsuario], (error, rows) => {
            if (error) reject(error);

            resolve(rows);
        })
    })
}


const getComentariosByParcelaId = (pIdParcela) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT c.*, u.nombre_usuario, u.imagen FROM huerto.comentarios as c, huerto.usuarios as u WHERE c.fk_parcela = ? and c.fk_usuario = u.id;', [pIdParcela], (error, rows) => {
            if (error) reject(error);

            resolve(rows);
        })
    })
}



const create = ({ texto_comentario }, pIdUsuario, pIdParcela) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO comentarios (texto_comentario, fk_usuario, fk_parcela) VALUES (?, ?, ?)', [texto_comentario, pIdUsuario, pIdParcela], (error, result) => {
            if (error) reject(error);
            resolve(result)
        })
    })
}


const updateById = (pIdComentario, { texto_comentario }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE comentarios SET texto_comentario = ? WHERE id = ?', [texto_comentario, pIdComentario], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}

const deleteById = (pIdComentario) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM comentarios WHERE id = ?', [pIdComentario], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}


module.exports = {
    getAll, getById, create, updateById, deleteById, getComentariosByParcelaId, getComentariosByUsuarioId
}