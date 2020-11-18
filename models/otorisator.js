const JR = require('../core')

module.exports = {
    model: JR.joi.object({
        id: JR.joi.string(),
        fullname: JR.joi.string().min(4).max(255).required(),
        position: JR.joi.string().min(5).max(255).required(),
        createdAt: JR.joi.date().default(Date.now())
    }),
    db : function (idOrotisator = null) {
        if(idOrotisator) return this.db().doc(idOrotisator)
        else return JR.admin.firestore().collection("Otorisator")
    }
}