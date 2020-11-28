//Metodo getAll() - GET
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        })
    })
}



const getById = (pIdUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE id = ?', [pIdUsuario], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        })
    })
}




//Metodo create() - POST  (Para ir a '/registro')
const create = ({ nombre, apellidos, sexo, nombre_usuario, email, password, direccion, fecha_nacimiento, experiencia, rol, imagen, comentario }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nombre, apellidos, sexo, nombre_usuario, email, password, direccion, fecha_nacimiento, experiencia, rol, imagen, comentario, fecha_registro) VALUES =(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, sexo, nombre_usuario, email, password, direccion, fecha_nacimiento, experiencia, rol, imagen, comentario, new Date], (error, result) => {
            if (error) reject(error);
            resolve(result)
        })
    })
}




//Metodo updateById() - PUT
const updateById = (pIdUsuario, { nombre, apellidos, sexo, nombre_usuario, email, password, direccion, fecha_nacimiento, experiencia, rol, imagen, comentario }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE usuarios SET nombre = ?, apellidos = ?, sexo = ?, nombre_usuario = ?, email = ?, password = ?, direccion = ?, fecha_nacimiento = ?, experiencia = ?, rol = ?, imagen = ?, comentario = ? WHERE id = ?', [pIdUsuario, nombre, apellidos, sexo, nombre_usuario, email, password, direccion, fecha_nacimiento, experiencia, rol, imagen, comentario], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}




//Metodo deleteById() - DELETE
const deleteById = (pIdUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM usuarios WHERE id = ?', [pIdUsuario], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    })
}



//Metodo getByEmail() - GET  (para ir a '/login')
const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuario WHERE EMAIL = ?', [pEmail], (error, rows) => {
            if (error) reject(error);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    })
}


module.exports = {
    getAll, getById, create, updateById, deleteById
}