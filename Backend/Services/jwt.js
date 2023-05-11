const moment = require('moment');
const jwt = require("jwt-simple");

const SECRET_KEY = "12345678";

module.exports = class JWTService{
    constructor(){
    }

    createAccessToken(user){
        const payload = {
            rut: user.rut,
            email: user.email,
            fullname: user.fullname,
            cargo: user.cargo,
            especialidad: user.especialidad,
            otros: user.otros,
            type: user.type,
            createToken: moment().unix(),
            active: user.active === 1 ? true : false,
            exp: moment().add(3, "hours").unix()
        }
        return jwt.encode(payload, SECRET_KEY)
    }

    decodeToken(token) {
        return jwt.decode(token, SECRET_KEY, true)
    }

    createRefreshToken(user){
        const payload = {
            rut: user.rut,
            expt: moment().add(30, "days").unix()
        }
        return jwt.encode(payload, SECRET_KEY)
    }
    willExpiredToken(token){
        try {
            const {exp} = this.decodeToken(token)
            const currentDate = moment().unix()
            if(currentDate > exp){
                return true
            }else{
                return false
            }
        } catch (error) {
            return true
        }
    }
}

exports.createAccessToken = (user) => {
    const payload = {
        name: user.name,
        rut: user.rut,
        type: user.type,
        createToken: moment().unix(),
        exp: moment().add(3, "hours").unix()
    }
    return jwt.encode(payload, SECRET_KEY)
}
exports.createRefreshToken = (user) => {
    
    const payload = {
        rut: user.rut,
        expt: moment().add(30, "days").unix()
    }
    return jwt.encode(payload, SECRET_KEY)
}
exports.decodeToken = (token) => {
    return jwt.decode(token, SECRET_KEY, true);
}