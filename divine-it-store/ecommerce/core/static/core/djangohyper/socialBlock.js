(function () {
    var SocialBlcok = {
        title: 'Social Block',
        description: 'Social block',
        default_values: {
            extra: {},
            settings: {}
        },
        settings_schema: {
            fields: [
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Facebook Url',
                    model: 'facebook_url',
                    placeholder: 'https://facebook.com'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Youtube Url',
                    model: 'youtube_url',
                    placeholder: 'https://youtube.com'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Linkedin Url',
                    model: 'linkedin_url',
                    placeholder: 'https://linkedin.com'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Google Plus',
                    model: 'googleplus_url',
                    placeholder: 'https://plus.google.com'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Twitter',
                    model: 'twitter_url',
                    placeholder: 'https://twitter.com'
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

    hyperEditor.register_block('social', SocialBlcok)
})()