(function () {
    var CategoryBlock = {
        title: 'Category',
        description: 'Product Category',
        default_values: {
            extra: {},
            settings: {}
        },
        settings_schema: {
            fields: [
                {
                    type: 'select',
                    label: 'Select Category',
                    model: 'categoryId',
                    required: true,
                    values: JSON.parse(CATEGORIES)
                },
                {
                    type: 'imageChooser',
                    label: 'Promotional Image',
                    model: 'image'
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Promotional Category URL',
                    model: 'action_url'
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

    hyperEditor.register_block('category', CategoryBlock)
})()