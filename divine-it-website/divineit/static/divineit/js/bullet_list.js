(function () {
    var BulletListBlock =  {
        title: 'Bullet List Block',
        description: 'Add Bullet List Block',
        default_values: {
            extra: {},
            settings: {}
        },
        config: {
            preview: function (self, callback) {
                callback('Bullet List Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
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
                            }
                        ]
                    }
                }
            ]

        }
    }

    hyperEditor.register_block('bullet_list', BulletListBlock)
})()