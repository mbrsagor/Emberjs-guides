(function () {
    var AddressBlock = {
        title: 'Store Map location',
        description: 'Add location with map',
        default_values: {
            extra: {},
            settings: {}
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
                                type: 'input',
                                inputType: 'text',
                                label: 'Store Title',
                                model: 'title'
                            },

                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Input Address',
                                model: 'map_address'
                            },

                            {
                                type: "input",
                                inputType: 'text',
                                label: "Cell Phone",
                                model: "cell_number"
                            },
                            {
                                type: "input",
                                inputType: 'text',
                                label: "Land Phone",
                                model: "land_number"
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Map Link',
                                model: 'map_link',
                            },
                        ]
                    }
                }
            ]
        },
        config: {
            styles: [
                {id: 'default', name: 'Default'}
            ],
            preview(self, callback) {
                callback('List')
            }
        }
    }

    hyperEditor.register_block('address_location', AddressBlock)
})()