(function () {

    // Fetch product list
    var PRODUCTS = []
    fetch(PRODUCTS_API).then(function(response) {
        return response.json()
    }).then(function(response) {
        PRODUCTS = response.results.map(function(item) {
            return item.name
        })
    })

    // Fetch services list
    var SERVICES = []
    fetch(SERVICES_API).then(function(response) {
        return response.json()
    }).then(function(response) {
        SERVICES = response.results.map(function(item) {
            return item.name
        })
    })

    // Fetch Industries list
    var INDUSTRIES = []
    fetch(INDUSTRIES_API).then(function(response) {
        return response.json()
    }).then(function(response) {
        INDUSTRIES = response.results.map(function(item) {
            return item.name
        })
    })

    // Fetch Solutions list
    var SOLUTIONS = []
    fetch(SOLUTIONS_API).then(function(response) {
        return response.json()
    }).then(function(response) {
        SOLUTIONS = response.results.map(function(item) {
            return item.name
        })
    })

    var CustomerBlock =  {
        title: 'Customer',
        description: 'Add Customer Block',
        default_values: {
            settings: {
                type: "All",
                order: "Most Recent First",
            }
        },
        config: {
            preview: function (self, callback) {
                callback('Customer Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [
                {
                    type: "select",
                    label: "Product",
                    model: "product",
                    values: function () {
                        return PRODUCTS
                    }
                },
                {
                    type: "select",
                    label: "Service",
                    model: "service",
                    values: function() {
                        return SERVICES
                    }
                },
                {
                    type: "select",
                    label: "Industry",
                    model: "industry",
                    values: function() {
                        return INDUSTRIES
                    }
                },
                {
                    type: "select",
                    label: "Solution",
                    model: "solution",
                    values: function() {
                        return SOLUTIONS
                    }
                },
                {
                    type:"input",
                    inputType:"number",
                    model: "perPage",
                    label: "Per Page",
                    min: 1
                },
                {
                    type:"checkbox",
                    model: "filterByIndustry",
                    label: "Filter By Industry",
                    default: true
                },
                {
                    type:"checkbox",
                    model: "filterByProduct",
                    label: "Filter By Product or Service",
                    default: true
                },
                {
                    type:"checkbox",
                    model: "filterBySolution",
                    label: "Filter By Solution",
                    default: true
                },
                {
                    type:"checkbox",
                    model: "remote",
                    label: "Get data from Remote",
                    default: true
                }

            ]

        }
    }

    hyperEditor.register_block('customer', CustomerBlock)
})()