const JR = require('../core')
const express   = require('express');
const cors      = require('cors');
const admin = express();
admin.use(cors({origin: true}))



admin.get('/', async (req, res) => {
    const snapshot = await JR.db.collection("Admin").get()

    let users = []
    
    snapshot.forEach(doc => {
        let id= doc.id
        let data = doc.data()

        users.push({id, ...data})
    })

    res.status(200).send(JSON.stringify(users))
})

admin.get("/:id", async(req, res) => {
    const snapshot = await JR.db.collection("Admin").doc(req.params.id).get()

    const userId = req.params.id
    const userData = snapshot.data()

    res.status(200).send(JSON.stringify({id: userId, ...userData}))
})

admin.post('/', async (req,res) => {
    const user = req.body;

    await JR.db.collection("Admin").add(user);

    res.status(201).send()
})

exports.admin = JR.functions.https.onRequest(admin);