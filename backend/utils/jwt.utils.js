const jwt = require('jsonwebtoken');
require('dotenv/config');


module.exports = {
    generateTokenForUser : (userData) => {
        return jwt.sign({
            idUser: userData.id,
            idRole: userData.idRole
        },
        process.env.JWT_SIGN_SECRET,
        {
            expiresIn: '12h'
        })
    }
}