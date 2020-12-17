(function () {
    var FaqBlock = {
        title: 'FAQ Block',
        description: 'Faq',
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
                                label: 'Faq Title',
                                model: 'title'
                            },

                            {
                                type: 'richtext',
                                label: 'Description',
                                model: 'description'
                            },
                            {
                                type: "input",
                                inputType: 'text',
                                label: "Price",
                                model: "price"
                            }
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

    hyperEditor.register_block('faq', FaqBlock)
})()