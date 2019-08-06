const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bcrypt = require('bcrypt')
const saltRounds = process.env.SALT_ROUNDS || 10

app.use(express.json())

app.post('/hash', (req, res) => {
    const password = req.body.password

    if (!password) {
        return res.status(400).send('Password required!')
    }

    const hash = bcrypt.hashSync(password, saltRounds);
    res.status(200).send(hash)
})

app.post('/check', (req, res) => {
    const { hash, password } = req.body

    if (!hash || !password) {
        return res.status(400).send('Hash and password required!')
    }

    const match = bcrypt.compareSync(password, hash)
    res.status(200).json({ match })
})

app.listen(port, () => console.log(`Bcrypt Service listening on port ${port}!`))