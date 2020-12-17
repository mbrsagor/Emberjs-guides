(function () {
    var SnippetBlock = {
        title: 'Snippet',
        description: 'Snippets chooser',
        default_values: {
            extra: {},
            settings: {}
        },
        settings_schema: {
            fields: [
                {
                    type: 'select',
                    label: 'Select Snippet',
                    model: 'snippetId',
                    required: true,
                    values: JSON.parse(SNIPPETS)
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

    hyperEditor.register_block('snippet', SnippetBlock)
})()