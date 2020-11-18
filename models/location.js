const JR = require('../core')

export default 
JR.joi.object({
    name: JR.joi.string().min(4).required(),
    address: JR.joi.string().min(4).required(),
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
    latitude: JR.joi.number().required(),
    longitude: JR.joi.number().required()
})