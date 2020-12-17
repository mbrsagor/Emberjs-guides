(function () {
    var parallaxBlock = {
        title: 'Parallax Image',
        description: 'Choose a image',
        default_values: {
            extra: {},
            settings: {}
        },
        settings_schema: {
            fields: [
                {
                    type: 'imageChooser',
                    label: 'Image',
                    model: 'image'
                }
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

    hyperEditor.register_block('parallax', parallaxBlock)
})()
