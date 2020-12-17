(function () {
    var VideoBlock =  {
        title: 'Video',
        description: 'Add New Video',
        default_values: {
            settings: {
                type: "YouTube",
            }
        },
        config: {
            preview: function (self, callback) {
                callback('Video Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [
                {
                    type: "select",
                    label: "Type",
                    model: "VideoType",
                    values: [
                        "YouTube",
                        "Vimeo"
                    ],
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
                    type: "select",
                    label: "Autoplay",
                    model: "autoPlay",
                    values: [
                        "AutoplayOn",
                        "AutoplayOff"
                    ],
                    required: true
                }
            ]

        }
    }

    hyperEditor.register_block('video', VideoBlock)
})()