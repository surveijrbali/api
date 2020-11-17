const JR = require('../core')
const express   = require('express');
const cors      = require('cors');
const user = express();
user.use(cors({origin: true}))



user.get('/', async (req, res) => {
    const snapshot = await JR.db.collection("Users").get()

    let users = []
    
    snapshot.forEach(doc => {
        let id= doc.id
        let data = doc.data()

        users.push({id, ...data})
    })

    res.status(200).send(JSON.stringify(users))
})

user.get("/:id", async(req, res) => {
    const snapshot = await JR.db.collection("Users").doc(req.params.id).get()

    const userId = req.params.id
    const userData = snapshot.data()

    res.status(200).send(JSON.stringify({id: userId, ...userData}))
})

user.post('/', async (req,res) => {
    const user = req.body;

    await JR.db.collection("Users").add(user);

    res.status(201).send()
})

exports.user = JR.functions.https.onRequest(user);