(function () {
    var VideoSliderBlock =  {
        title: 'Image & Video Slider',
        description: 'Add video slider Block',
        default_values: {
            extra: {},
            settings: {}
        },
        config: {
            preview: function (self, callback) {
                callback('video List Block')
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
                                label: 'Sub Heading',
                                model: 'sub_heading'
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
                            },
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
                                label: 'Action Title',
                                model: 'actionTitle'
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

    hyperEditor.register_block('videoslider', VideoSliderBlock)
})()