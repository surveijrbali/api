const JR = require('../core')
const survei = require('./survei')

export default {
    model : JR.joi.object({
        id:JR.joi.string(),
        message: JR.joi.string().min(4).required(),
        createdAt: JR.joi.date().default(Date.now())
    }),
    db : function (idSurvey, idLog = null) {
        if(idLog) return this.db(idSurvey).doc(idLog)
        else return survei.db(idSurvey).collection("Log")
    }
}
