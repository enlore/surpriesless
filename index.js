"use strict"

const express = require("express")

const app = express()

app.use(express.static(__dirname + "/static"))

const port = process.env.PORT

app.listen(port, () => {
    console.info(`Listening on ${port}`)
})
