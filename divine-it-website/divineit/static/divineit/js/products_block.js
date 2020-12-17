(function () {
    var ProductsBlock =  {
        title: 'Products',
        description: 'Add Products Block',
        default_values: {
            extra: {},
            settings: {}
        },
        config: {
            preview: function (self, callback) {
                callback('Products Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [
                {
                    type: 'multipleObject',
                    label: "Items",
                    model: "items",
                    object_schema: {
                        fields: [
                            {
                                type: 'imageChooser',
                                label: 'Background Image',
                                model: 'bgImage'
                            },
                            {
                                type: 'imageChooser',
                                label: 'Logo',
                                model: 'logoImage'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Short Description',
                                model: 'sortDescription'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Overview Url',
                                model: 'ovrviewUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Product Website Url',
                                model: 'productWebsiteUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Pricing Url',
                                model: 'pricingUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Demo Request',
                                model: 'quoteUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Solutions Url',
                                model: 'solutionsUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Industries Url',
                                model: 'industriesUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Download Url',
                                model: 'downloadUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Price per year',
                                model: 'price'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Price Sub heading',
                                model: 'sortSubHeading'
                            }
                        ]
                    }
                }
            ]

        }
    }

    hyperEditor.register_block('products', ProductsBlock)
})()