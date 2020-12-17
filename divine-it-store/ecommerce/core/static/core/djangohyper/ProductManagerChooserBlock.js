(function () {
    var ProductManager = {
        title: 'Product Manager',
        description: 'Manage Products',
        default_values: {
            extra: {},
            settings: {}
        },
        settings_schema: {
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
                    type: 'select',
                    label: 'Select Category',
                    model: 'categoryId',
                    required: true,
                    values: JSON.parse(CATEGORIES)
                },
                {
                    type: 'checkbox',
                    label: 'Featured',
                    model: 'status',
                    default: false
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

    hyperEditor.register_block('manager', ProductManager)
})()