(function () {
    var CareerBlock =  {
        title: 'Career',
        description: 'Add Career Block',
        default_values: {
            settings: {
                type: "Enabled Only",
                order: "Most Recent First",
                perPage: 4
            }
        },
        config: {
            preview: function (self, callback) {
                callback('Career Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [
                {
                    type: "select",
                    label: "Type",
                    model: "type",
                    values: [
                        "All",
                        "Enabled Only",
                    ],
                    required: true
                },
                {
                    type: "select",
                    label: "Order",
                    model: "order",
                    values: [
                        "Most Recent First",
                        "Oldest First"
                    ],
                    required: true
                },
                {
                    type: "input",
                    inputType: "number",
                    label: "Per Page",
                    model: "perPage",
                    min: 1,
                    required: true
                }
            ]

        }
    }

    hyperEditor.register_block('career', CareerBlock)
})()