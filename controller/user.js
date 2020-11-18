const BASE = require('../core')
const User = require('../models/user')
const Petugas = require('../models/petugas')
const Otorisator = require('../models/otorisator')
const user = BASE.initialize(true)


// Get User List
user.get('/', async (req, res) => {
    const data = await(await User.db().get()).docs
    let ret = []

    data.forEach(doc => {
        ret.push({key : doc.id, data: doc.data()})
    });

    res.status(200).send({status: true, data : ret})
})

// Get User Document by id
user.get('/:id', async (req, res) => {

    const id = req.params.id

    const user = await(await User.db(id).get()).data()
    
    if(user){
        res.status(200).send({status: true, data : user})
        return
    }

    res.status(400).send({status : false, error: "user with id " + id + " not found"})
})

// Insert new user document
user.post('/', async (req, res)=> {
    const input = req.body

    const cek = User.model.validate(input)

    if(!cek.error){
        BASE.admin.auth().createUser({
            email: input.email,
            password: input.password
        }).then(async data=>{
            input.id = data.uid
            input.createdAt = cek.value.createdAt    
            const save = await User.db(input.id).set(input)
            return res.status(201).send({status: true, data: input})
        }).catch(err=>{
            res.status(400).send({status : false, error: err.message})
        })

        return
    }

    res.status(400).send({status : false, error: cek.error.message})
})


// Update document by id
user.put('/:id', async (req, res)=>{
    const input = req.body

    await User.db(req.params.id).update(input)
    res.status(200).send({status: true})
})

exports.user = BASE.send(user);