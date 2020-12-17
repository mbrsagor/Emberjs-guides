(function () {
    var GoogleMapBlock =  {
        title: 'Google Map',
        description: 'Add Google Map',
        default_values: {
            settings: {
                type: "GoogleMap",
            }
        },
        config: {
            preview: function (self, callback) {
                callback('Google Map Block')
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
                        "GoogleMap",
                    ],
                    required: true
                },
                {
                    type: "input",
                    inputType: "text",
                    model: "googlemapId",
                    label: "Input googlemap iframe src code",
                    required: true
                }
            ]

        }
    }

    hyperEditor.register_block('google_map', GoogleMapBlock)
})()