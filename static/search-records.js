(function () {
    var records = new Vue({
        el: "#records-view",

        data: {
            query: "",
            _records: []
        },

        computed: {
            records: {
                set: function (val) {
                    console.info("set", val)
                    this._records = val
                },

                get: function () {
                    var query = this.query.trim()

                    console.info("get", query)

                    if (query === "" || query === void 0)
                        return this._records
                    else {
                        return this._records.filter(function (record) {
                            return record.id === query
                        })
                    }
                }
            }
        },

        methods: {
            doSearch: function doSearch () {
                var self = this
            },
        },

        created: function () {
            var self = this

            superagent.get("/purchase-history")
                .end(function (err, resp) {
                    if (err) console.error(err)
                    self.records = resp.body.records
                    self.query = "x"
                    self.query = "" // HAX
                })
        }
    })
})()
