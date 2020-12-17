(function () {
    var KBBlock =  {
        title: 'Knowledgebase',
        description: 'Add Knowledgebase',
        default_values: {},
        config: {
            preview: function (self, callback) {
                callback('Knowledge Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [
                {
                    type: 'checkbox',
                    label: 'Product filter ?',
                    model: 'is_product_filter',
                    default: false
                },
                {
                    type: 'checkbox',
                    label: 'Service filter ?',
                    model: 'is_service_filter',
                    default: false
                }
            ]
        }
    }

    hyperEditor.register_block('knowledge_base', KBBlock)
})()