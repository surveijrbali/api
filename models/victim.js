const JR = require('../core')
const location = require('./location')

export default 
JR.joi.object({
    name: JR.joi.string().min(4).required(),
    address: location,
    accidentDate: JR.joi.date().default(Date.now()),
    accidentLocation: location
})