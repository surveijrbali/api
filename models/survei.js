const JR = require('../core')
const victim = require('./victim')

module.exports = {
    model: JR.joi.object({
        id: JR.joi.string(),
        number: JR.joi.string().min(4).max(255).required(),
        petugasId: JR.joi.string().min(4).max(255).required(),
        date: JR.joi.date().default(Date.now()),
        type: JR.joi.string().valid(
            'Keterjaminan Korban Perawatan/Pengobatan', 
            'Keabsahan Ahli Waris', 
            'Keabsahan Biaya', 
            'Kasus Tabrak Lari', 
            'Undefined'
            ).required(),
        victim: victim,
        createdAt: JR.joi.date().default(Date.now())
    }),
    db : function (idSurvei = null) {
        if(idSurvei) return this.db().doc(idSurvei)
        else return JR.admin.firestore().collection("Survei")
    }
}