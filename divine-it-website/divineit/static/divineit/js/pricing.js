(function () {
    var PrcingBlock =  {
        title: 'Custom Pricing',
        description: 'Add Custom Pricing Table',
        default_values: {
            extra: {},
            settings: {}
        },
        config: {
            preview: function (self, callback) {
                callback('Pricing table Block')
            },
            styles: [{id: 'default', name: 'Default'}]
        },
        settings_schema: {
            fields: [{
                type: 'multipleObject',
                label: "Pricing Packages",
                model: "items",
                object_schema:{
                    fields: [

                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Pricing Type',
                            model: 'type'
                        },
                        {
                            type: 'input',
                            inputType: 'text',
                            label: 'Price',
                            model: 'price'
                        },
                        {
                            type: 'checkbox',
                            label: 'Recommended',
                            model: 'recommended',
                            default: false
                        },
                        {
                            type:'input',
                            inputType:'text',
                            label:'Action Title',
                            model:'actionTitle'
                        },
                        {
                            type:'input',
                            inputType:'url',
                            label:'URL',
                            model:'actionUrl'
                        },
                        {
                            type:'input',
                            inputType:'url',
                            label:'Conditional Title',
                            model:'conditionalTitle'
                        },
                        {
                            
                            type: 'multipleObject',
                            label: "Features",
                            model: "items",
                            object_schema: {
                                fields: [
                                    {
                                        type: 'input',
                                        inputType: 'text',
                                        label: 'Pricing Feature Heading',
                                        model: 'feature_heading'
                                    },
                                    {
                                        type: 'multipleObject',
                                        label: "Features List",
                                        model: "items",
                                        object_schema:{
                                            fields: [
                                                {
                                                    type: 'input',
                                                    inputType: 'text',
                                                    label: 'Pricing Feature List',
                                                    model: 'feature_list'
                                                },
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                        
                    ]
                }
            }]
            
        }
    };

    hyperEditor.register_block('pricing', PrcingBlock)
})();