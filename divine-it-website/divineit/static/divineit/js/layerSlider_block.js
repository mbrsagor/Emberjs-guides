(function () {
    let LayerSliderBlock =  {
        title: 'Multiple layer slider',
        description: 'Add multiple image layer slider',
        default_values: {
            extra: {},
            settings: {}
        },
        config: {
            preview: function (self, callback) {
                callback('layer List Block')
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
                                label: 'Title',
                                model: 'title'
                            },
                            {
                                type: 'richtext',
                                label: 'Description',
                                model: 'description'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: '1st layer logo URL',
                                model: 'overviewUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: '2nd layer logo URL',
                                model: 'overviewUrl2'
                            },
                            {
                                type: "imageChooser",
                                label: "Slide Image",
                                model: "image",
                                required: true
                            },
                            {
                                type: 'imageChooser',
                                label: 'Right side Logo',
                                model: 'logoImage'
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
    };

    hyperEditor.register_block('layerslider', LayerSliderBlock)
})();
