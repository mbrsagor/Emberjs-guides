(function () {
    var ValueBlock =  {
        title: 'Value',
        description: 'Add Value Block',
        default_values: {
            settings: {

            }
        },
        config: {
            preview: function (self, callback) {
                callback('Value Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Center Heading',
                    model: 'center_heading'
                },
                {

                    type: 'multipleObject',
                    label: "Items",
                    model: "items",
                    object_schema: {
                        fields: [
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Value Name',
                                model: 'value'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Heading',
                                model: 'heading'
                            },
                            {
                                type: 'imageChooser',
                                label: 'Image',
                                model: 'image'
                            },
                            {
                                type: 'richtext',
                                label: 'Description',
                                model: 'description'
                            }
                        ]
                    }
                }
            ]

        }
    }

    hyperEditor.register_block('value', ValueBlock)
})()