(function () {
    var iframeBlock =  {
        title: 'Iframe',
        description: 'Add iframe Block',
        default_values: {
            settings: {
                type: "iframe",
            }
        },
        config: {
            preview: function (self, callback) {
                callback('Iframe Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [
                {
                    type: "input",
                    inputType: "url",
                    model: "iframeId",
                    label: "Input iframe url",
                    required: true
                }
            ]

        }
    }

    hyperEditor.register_block('iframe', iframeBlock)
})()