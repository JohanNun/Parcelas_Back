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

const getComentarioByUsuarioId = (pIdUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huerto.comentarios WHERE comentarios.fk_usuario = ?', [pIdUsuario], (error, rows) => {
            if (error) reject(error);
            /* if (rows.length === 0) resolve(null); */
            resolve(rows);
        })
    })
}

const getComentarioByParcelaId = (pIdParcela) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM huerto.comentarios WHERE comentarios.fk_parcela = ?', [pIdParcela], (error, rows) => {
            if (error) reject(error);
            /* if (rows.length === 0) resolve(null); */
            resolve(rows);
        })
    })
}


const create = ({ texto_comentario }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO comentarios (texto_comentario) VALUES (?)', [texto_comentario], (error, result) => {
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
    getAll, getById, create, updateById, deleteById, getComentarioByParcelaId, getComentarioByUsuarioId
}