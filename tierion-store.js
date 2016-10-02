"use strict"

const superagent = require("superagent")

// RaB5ZJ9HR4jemyRA6HToZegnFD28pWAoFE5WDe1nIaE
class TierionStore {
    constructor (opts) {
        opts = opts || {}
        this.apiKey = opts.apiKey
        this.storeId = opts.storeId
    }

    // https://api.tierion.com/v1/explorer/records?datastoreId=<datastoreId>
    _doReq (url, query, cb) {
        superagent.get(url)
            .query(query || {})
            .end((err, res) => {
                if (err) cb(err)
                else cb(null, res.body)
            })
    }

    getRecords (cb) {
        let url = 'https://api.tierion.com/v1/explorer/records'
        let query = { datastoreId: this.storeId }
        this._doReq(url, query, cb)
    }

    getRecord (id, cb) {
        let url = `https://api.tierion.com/v1/explorer/records/${id}`
        this._doReq(url, {}, cb)
    }
}
module.exports = TierionStore
