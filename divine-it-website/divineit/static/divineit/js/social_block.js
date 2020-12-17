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
                    placeholder: 'Your facebook url'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Youtube Url',
                    model: 'youtube_url',
                    placeholder: 'Your youtube url'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Linkedin Url',
                    model: 'linkedin_url',
                    placeholder: 'Your linkedin url'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Twitter',
                    model: 'twitter_url',
                    placeholder: 'Your twitter url'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Wechat',
                    model: 'wechat_url',
                    placeholder: 'Your wechat id'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Skype',
                    model: 'skype_url',
                    placeholder: 'Your skype id'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Instagram',
                    model: 'instagram_url',
                    placeholder: 'Your instagram url'
                },
                {
                    type: 'input',
                    inputType: 'url',
                    label: 'Whatsapp',
                    model: 'whatsapp_url',
                    placeholder: 'Your whatsapp number'
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

    hyperEditor.register_block('socialBlock', SocialBlcok)

})()