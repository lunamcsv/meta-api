require('dotenv').config()
const { db, meta } = require('./db')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.get('/token/:token_id', async (req, res) => {
    const tokenId = parseInt(req.params.token_id).toString()
    const metadata = await db(meta, {_id: tokenId}, '')
    if (metadata) return res.send(metadata[0])
    res.send({})
})

app.get('/token/:token_id', async (req, res) => {
  const tokenId = parseInt(req.params.token_id).toString()
  const metadata = await db(meta, {_id: tokenId}, '')
  if (metadata) return res.send(metadata[0])
  res.send({})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

