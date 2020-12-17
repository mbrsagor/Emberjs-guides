(function () {
    var MapBlock = {
        title: 'Google Map',
        description: 'Google Map Settings',
        default_values: {
            extra: {},
            settings: {
                mapHeight: 450,
                mapWidth: 600,
            }
        },
        settings_schema: {
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Map Link',
                    model: 'mapLink',
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Height',
                    model: 'mapHeight',
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Width',
                    model: 'mapWidth',
                }
            ]
        },
        config: {
            styles: [
                {id: 'default', name: 'Default'},
            ],
            preview(self, callback) {
                callback('List')
            }
        }
    }

    hyperEditor.register_block('map', MapBlock)
})()