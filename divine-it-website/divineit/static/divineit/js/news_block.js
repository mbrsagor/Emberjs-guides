(function () {
    var NewsBlock =  {
        title: 'News',
        description: 'Add News Block',
        default_values: {
            settings: {
                type: "Without Featured",
                perPage: 5,
                order: "Most Recent First"
            }
        },
        config: {
            preview: function (self, callback) {
                callback('News Block')
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
                        "Featured Only",
                        "Without Featured"
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

    hyperEditor.register_block('news', NewsBlock)
})()