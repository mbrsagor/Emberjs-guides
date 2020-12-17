(function () {
    var FormBlock = {
        title: 'Form',
        description: 'Custom Form',
        default_values: {
            extra: {},
            settings: {
                mailTo: 'example@example.com',
                subject: 'Enter subject here'
            }
        },
        settings_schema: {
            fields: [
                {
                    type: 'select',
                    label: 'Select Form',
                    model: 'formCode',
                    required: true,
                    values: JSON.parse(FORMS)
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Mail To',
                    model: 'mailTo',
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Subject',
                    model: 'subject',
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

    hyperEditor.register_block('form', FormBlock)
})()