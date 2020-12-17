(function () {
    var LeadershipBlock =  {
        title: 'Leadership',
        description: 'Add Leadership Block',
        default_values: {
            extra: {},
            settings: {}
        },
        config: {
            preview: function (self, callback) {
                callback('Leadership Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [
                {
                    type: 'multipleObject',
                    label: "Items",
                    model: "items",
                    object_schema: {
                        fields: [
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Name',
                                model: 'name'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Designation',
                                model: 'designation'
                            },
                            {
                                type: 'imageChooser',
                                label: 'Image',
                                model: 'image'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Facebook Url',
                                model: 'facebookUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Twitter Url',
                                model: 'twitterUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Linkedin Url',
                                model: 'linkedinUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Github Url',
                                model: 'githubUrl'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Personal Blog Url',
                                model: 'personalnUrl'
                            },
                            {
                                type: 'richtext',
                                label: 'Description',
                                model: 'description'
                            },
                        ]
                    }
                }
            ]

        }
    }

    hyperEditor.register_block('leadership', LeadershipBlock)
})()
