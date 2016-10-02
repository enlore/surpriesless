(function () {
    var records = new Vue({
        el: "#records-view",

        data: {
            records: []
        },

        created: function () {
            var self = this

            superagent.get("/purchase-history")
                .end(function (err, resp) {
                    self.records = resp.body.records
                })
        }
    })
})()
