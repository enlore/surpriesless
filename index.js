"use strict"

const express = require("express")

const app = express()

app.use(express.static(__dirname + "/static"))

// submit sale, submit purchase
// GET - submit sale form
// user fills out form
// POST - submit sales form
// send crap to blockchain
// save item for sale in local db, id of such
//
// see a list of items that hav been listed
// GET - list all items

app.get("/submit-purchase", function (req, res, next) {
    res.send("Hey you asked for " + req.url)
})

const port = process.env.PORT

app.listen(port, () => {
    console.info(`Listening on ${port}`)
})
