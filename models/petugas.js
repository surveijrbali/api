const JR = require('../core')

module.exports = {
    model: JR.joi.object({
        id: JR.joi.string(),
        fullname: JR.joi.string().min(4).max(255).required(),
        region: JR.joi.string().valid(
            'Kabupaten Badung', 
            'Kabupaten Bangli', 
            'Kabupaten Buleleng', 
            'Kabupaten Gianyar', 
            'Kabupaten Jembrana', 
            'Kabupaten Karangasem', 
            'Kabupaten Klungkung', 
            'Kabupaten Tabanan', 
            'Kota Denpasar', 
            'Undefined'
            ).required(),
        createdAt: JR.joi.date().default(Date.now())
    }),
    db : function (idPetugas = null) {
        if(idPetugas) return this.db().doc(idPetugas)
        else return JR.admin.firestore().collection("Petugas")
    }
}