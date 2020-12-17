(function () {
    var PromotionBlock = {
        title: 'Promotion Block',
        description: 'Promotion',
        default_values: {
            extra: {},
            settings: {}
        },
        settings_schema: {
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Title',
                    model: 'title'
                },
                {
                    type: 'richtext',
                    label: 'Description',
                    model: 'description'
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
                                label: 'Text',
                                model: 'text'
                            },
                            {
                                type: 'imageChooser',
                                label: 'Image',
                                model: 'image'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Action url',
                                model: 'action_url'
                            },
                        ]
                    }
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Price',
                    model: 'price'
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Discount',
                    model: 'discount'
                },
                {
                    type: 'imageChooser',
                    label: 'Image',
                    model: 'image'
                },
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

    hyperEditor.register_block('promotion', PromotionBlock)
})()