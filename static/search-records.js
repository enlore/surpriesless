(function () {
    var records = new Vue({
        el: "#records-view",

        data: {
            query: "",
            _searchDB: {},
            _records: [],
            _recordsBySerial: []
        },

        methods: {
            group: function (records) {
                var grouped = _.groupBy(records, "data.equipmentserial")
                var groupedArr = _.toArray(grouped)
                var arr = _.flatten(groupedArr)
                return arr
            }
        },

        computed: {
            grouped: {
                get: function () {

                },

                set: function (val) {
                    this._recordsBySerial = val
                }
            },

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
                        //return this._records.filter(function (record) {
                            //return record.id === query
                        //})
                        var res = this._searchDB.search(query, {
                            fields: [
                                "id",
                                "data.sellerfirstname",
                                "data.sellerlastname",
                                "data.selleremailaddress",
                                "data.buyerfirstname",
                                "data.buyerlastname",
                                "data.buyeremailaddress",
                                "data.buyertaxid",
                                "data.transactiondate",
                                "data.equipmentname",
                                "data.equipmentdescription",
                                "data.equipmentserial"
                            ],
                            nesting: true
                        })

                        var ids = res.items.map(function (item) {
                            return item.id
                        })

                        var self = this

                        var mapped = ids.map(function (id) {
                            return self._records[id]
                        })

                        return this.group(mapped)


                        //var sorted = arr.sort(function (a, b) {
                            //return moment(a.data.transactiondate).isBefore(moment(b.data.transactiondate))
                        //})
                    }
                }
            }
        },

        created: function () {
            var self = this

            superagent.get("/purchase-history")
                .end(function (err, resp) {
                    if (err) console.error(err)
                    self.records = self.group(resp.body)
                    self.query = "x"
                    self.query = "" // HAX

                    self._searchDB = new Sifter(resp.body)

                })
        }
    })
})()
