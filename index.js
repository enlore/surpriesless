"use strict"

const TierionStore = require("./tierion-store.js")

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
const purchaseRecordStore = new TierionStore({
    apiKey: "RaB5ZJ9HR4jemyRA6HToZegnFD28pWAoFE5WDe1nIaE",
    storeId: "991"
})

app.get("/purchase-history", (req, res) => {
    var recordId = req.query.recordId;

    if (recordId) {
        purchaseRecordStore.getRecord(recordId, (err, record) => {
            if (err) return res.json(err)
            res.json(record)
        })
    } else {
        purchaseRecordStore.getRecords((err, records) => {
            if (err) return res.json(err)
            //res.json(records)
            let ids = records.records.map(record => record.id)
            let count = 0
            let _rec = []

            ids.forEach(id => {
                purchaseRecordStore.getRecord(id, (err, record) => {
                    if (err) console.error(err)
                    else {
                        _rec.push(record)
                        count++
                        if (count === ids.length) {
                            res.json(_rec)
                        }
                    }
                })
            })
        })
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.info(`Listening on ${port}`)
})
