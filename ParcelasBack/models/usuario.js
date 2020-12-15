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
const create = ({ nombre, apellidos, sexo, nombre_usuario, telefono, email, password, locacion, fecha_nacimiento, imagen, descripcion }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (nombre, apellidos, sexo, nombre_usuario, telefono, email, password, locacion, fecha_nacimiento, imagen, descripcion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellidos, sexo, nombre_usuario, telefono, email, password, locacion, fecha_nacimiento, imagen, descripcion, new Date], (error, result) => {
            if (error) reject(error);
            resolve(result)
        })
    })
}




//Metodo updateById() - PUT
const updateById = (pIdUsuario, { nombre, apellidos, sexo, nombre_usuario, telefono, email, password, locacion, fecha_nacimiento, imagen, descripcion }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE usuarios SET nombre = ?, apellidos = ?, sexo = ?, nombre_usuario = ?, telefono = ?, email = ?, password = ?, locacion = ?, fecha_nacimiento = ?, imagen = ?, descripcion = ? WHERE id = ?', [nombre, apellidos, sexo, nombre_usuario, telefono, email, password, locacion, fecha_nacimiento, imagen, descripcion, pIdUsuario], (error, result) => {
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
        db.query('SELECT * FROM usuarios WHERE EMAIL = ?', [pEmail], (error, rows) => {
            if (error) reject(error);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    })
}



const getByUserName = (nombreUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombreUsuario], (error, rows) => {
            if (error) reject(error);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    })
}



const getUserByParcela = (pIdParcela) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE fk_parcela = ?', [pIdParcela], (error, rows) => {
            if (error) reject(error);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        })
    })
}



module.exports = {
    getAll, getById, create, updateById, deleteById, getByEmail, getByUserName, getUserByParcela
}