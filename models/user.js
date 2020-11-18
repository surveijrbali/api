const JR = require('../core')

module.exports = {
    model: JR.joi.object({
        id: JR.joi.string(),
        email: JR.joi.string().email().required(),
        password: JR.joi.string().min(6).max(255).required(),
        type: JR.joi.string().valid('Petugas', 'Otorisator', 'Undefined').required(),
        createdAt: JR.joi.date().default(Date.now())
    }),
    db : JR.admin.firestore().collection("Users")
}