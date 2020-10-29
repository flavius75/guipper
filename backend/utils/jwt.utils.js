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
    },
    parseAuthorization : (authorization) => {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId : (authorization) => {
        let userId = -1;
        const token = module.exports.parseAuthorization(authorization);
     
        if(token != null){
            try{
                const jwtToken = jwt.verify(token,process.env.JWT_SIGN_SECRET);
                if(jwtToken != null)
                userId = jwtToken.idUser;
            } catch(err){}
        }
        return userId;
    }
}