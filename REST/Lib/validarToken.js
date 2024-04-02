const jwt = require('jsonwebtoken');
const session = require('express-session');

// Middleware para validar el token JWT utilizando la clave secreta de sesión
function validarToken(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        // Verificar el token JWT utilizando la clave secreta de sesión almacenada en el objeto de sesión del usuario
        jwt.verify(token.split(' ')[1], req.session.sessionSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json({ mensaje: 'Token inválido' });
            }
            req.user = decoded; // Almacenar los datos del usuario decodificados en el objeto de solicitud (req)
            next(); // Continuar con el siguiente middleware o controlador de ruta
        });
    } else {
        res.status(401).json({ mensaje: 'Token no proporcionado' });
    }
}

module.exports = validarToken;
