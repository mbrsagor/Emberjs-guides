(function () {
    var FaqBlock =  {
        title: 'FAQ',
        description: 'Add Faq List Block',
        default_values: {
            extra: {},
            settings: {}
        },
        config: {
            preview: function (self, callback) {
                callback('Faq List Block')
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
                                inputType: 'url',
                                label: "URL",
                                model: "url"
                            }
                        ]
                    }
                }
            ]

        }
    }

    hyperEditor.register_block('faq', FaqBlock)
})()