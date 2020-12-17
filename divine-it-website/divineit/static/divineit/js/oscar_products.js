(function () {
    var remoteOscarProductChooser = function (block_id) {
        return {
            type: 'chooser',
            label: 'Product Chooser',
            model: 'product',
            chooserButtonText: 'Choose Product',
            getItems: function(query, page, perPage, callback) {
                var url = PROVIDER_URLS[block_id]
                console.log(url)
                fetch( url, {credentials: 'include'})
                .then(function(response) { return response.json() })
                .then(function(data) {
                    var totalItems = Object.keys(data.data).length
                    var tempMap = {}
                    for(var i = 0; i<totalItems; i++) {
                        tempMap[data.data[i].id] = data.data[i];
                    }
                    for(var i = 0; i<totalItems; i++) {
                        if(data.data[i].parent !== null) {
                            data.data[i].parent = tempMap[data.data[i].parent]
                        }
                    }
                    callback({
                        total: totalItems,
                        currentPage: 1,
                        result: data.data,
                        perPage: totalItems
                    })
                })
            },

            displayItem: function(item) {
                var parent = item.parent !== null ? item.parent.title : '';
                return `<div class="card text-center">
                            <div class="card-body">
                                <small>${parent}</small>
                                <h5 class="card-title">${item.title}</h5>
                            </div>
                       </div>`
            },

            displaySelectedItem: function (item) {
                var parent = item.parent !== null ? item.parent.title : '';
                return `<div class="card text-center">
                            <div class="card-body">
                                <small>${parent}</small>
                                <h5 class="card-title">${item.title}</h5>
                            </div>
                       </div>`
            }
        }
    }

    var oscarProductBlock =  function (remoteProductChooser) {
        return {
            title: 'Oscar Product',
            description: 'Add Remote Oscar Product in page',
            default_values: {
                settings: {}
            },
            config: {
                preview: function (self, callback) {
                    callback('Remote Menu Block')
                },
                styles: [{id: 'default', name: 'Default'}]
            },
            settings_schema: {

                fields: [
                    {
                        type: 'multipleObject',
                        label: "Products",
                        model: "products",
                        object_schema: {
                            fields: [remoteProductChooser]
                        }
                    }
                ]

            }
        }
    }

    hyperEditor.register_block('oscar_product', oscarProductBlock(remoteOscarProductChooser('oscar_product')))
})()