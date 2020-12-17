(function () {
    var CategoryManager = {
        title: 'Top Category',
        description: 'Add category',
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

    hyperEditor.register_block('top_category', CategoryManager)
})()