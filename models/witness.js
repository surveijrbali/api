const JR = require('../core')
const survei = require('./survei')

module.exports = {
    model: JR.joi.object({
        id: JR.joi.string(),
        email: JR.joi.string().email().required(),
        password: JR.joi.string().min(6).max(255).required(),
        type: JR.joi.string().valid('Petugas', 'Otorisator', 'Undefined').required(),
        createdAt: JR.joi.date().default(Date.now())
    }),
    db : function (idSurvei, idWitness = null) {
        if(idWitness) return this.db(idSurvei).doc(idWitness)
        else return survei.db(idSurvei).collection('Witness')
    }
}