(function () {
    var imageGallery =  {
        title: 'Image Gallery',
        description: 'Add Image Gallery Block',
        default_values: {
            extra: {},
            settings: {}
        },
        config: {
            preview: function (self, callback) {
                callback('Image Gallery Block')
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
                                label: 'Name',
                                model: 'name'
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
    hyperEditor.register_block('imagegallery', imageGallery)
})()
