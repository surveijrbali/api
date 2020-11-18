const BASE = require('../core')
const { type } = require('../models/user')
const User = require('../models/user')
const auth = BASE.initialize()


auth.post('/signup', async (req, res)=> {

    const email = req.body.email
    const password = req.body.password
    const type = req.body.type

    const user = {
        email: email,
        password: password,
        type: type,
    }

    const valid = User.model.validate(user)

    if(!valid.error){
        BASE.admin.auth().createUser({
            email: user.email,
            password: user.password
        }).then(async data=>{

            user.id = data.uid
            user.createdAt = valid.value.createdAt    
            const save = await User.db(user.id).set(user)
            
            return res.status(201).send({status: true, data: user})
        }).catch(err=>{
            res.status(400).send({status : false, error: err.message})
        })
        return
    }

    res.status(400).send({status : false, error: valid.error.message})
})

auth.post('/', async(req, res) => {

    const email = req.body.email
    const password = req.body.password
    
    const user = {
        email: email,
        password: password,
        type: 'Undefined',
    }

    const valid = User.model.validate(user)
    if(!valid.error){
        const cek = await User.db().where("email", "==", email).where('password' , "==", password).limit(1).get()
        if(cek.docs.length===1){
            const user = cek.docs[0].data()
            const accessToken = BASE.jwt.sign(user, BASE.constant.SECRET_KEY) 
            res.status(200).send({status: true, data: {user: user , accessToken: accessToken}})
        } else {
            res.status(400).send({status : false, error: "Wrong email or password"})
        }
        
    } else {
        res.status(400).send({status : false, error: valid.error.message})
    }
})

exports.auth = BASE.send(auth);