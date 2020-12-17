(function () {
    var PromoBlock =  {
        title: 'Promo Box',
        description: 'Add Promo Box',
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

                    type: 'multipleObject',
                    label: "Items",
                    model: "items",
                    object_schema: {
                        fields: [
                             {
                                type: 'imageChooser',
                                label: 'Image',
                                model: 'image'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Heading',
                                model: 'heading'
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

    hyperEditor.register_block('promo', PromoBlock)
})()