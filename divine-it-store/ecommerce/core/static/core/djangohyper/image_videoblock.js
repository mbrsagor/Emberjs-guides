(function () {
    var VideoImageBlock =  {
        title: 'Image & Video Slider',
        description: 'Add video slider Block',
        default_values: {
            settings: {
                type: "",
            }
        },
        config: {
            preview: function (self, callback) {
                callback('image video slider')
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
                                type: "imageChooser",
                                label: "Choose Image",
                                model: "image",
                                required: true
                            },
                            {
                                type: "input",
                                inputType: "text",
                                model: "videoId",
                                label: "Input Video ID",
                                required: true
                            },
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
                            }

                        ]
                    }
                }
            ]

        }
    }

    hyperEditor.register_block('videoslider', VideoImageBlock)
})()