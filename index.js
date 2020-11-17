const core = require('./core')
const fs = require('fs');
const path = require('path')

let data = {}
for (const [key, value] of Object.entries(exports)) {
    data = core.addToObject(data, key, value)
}

fs.readdirSync(path.resolve(__dirname, './controller')).forEach((file)=>{
    if(file.split('.').slice(0, -1).join('.').length!==0){
        const h = require("./controller/" +file.split('.').slice(0, -1).join('.'))
        for (const [key, value] of Object.entries(h)) {
            data = core.addToObject(data, key, value)
        }
    }
})
module.exports = data
