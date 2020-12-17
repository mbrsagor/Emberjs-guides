(function () {

    var NewsPaperChooserField = function (page_search_url) {
        return {
            type: 'chooser',
            label: 'Newspaper Chooser',
            model: 'image',
            chooserButtonText: 'Choose Newspaper',
            getItems: function(query, page, perPage, callback) {
                var str = 'q='+query + '&page='+page + '&perPage='+perPage+'&collection=Newspaper'
                fetch( page_search_url + '?' + str, {credentials: 'include'})
                .then(function(response) { return response.json() })
                .then(function(data) {
                    callback({
                        total: data.total,
                        currentPage: data.current_page,
                        result: data.result,
                    })
                })
            },

            displayItem: function(item) {
                return '<div class="card text-center"><div class="card-body"><img src="' + item.url + '" alt="" height="87px" width="100px" /></div></div>'
            },

            displaySelectedItem: function (item) {
                return '<div class="card text-center"><div class="card-body"><img src="' + item.url + '" alt="" height="87px" width="100px" /></div></div>'
            }
        }
    };

    var NewsPaperBlock = {
        title: 'News Paper',
        description: 'Add News Paper Block',
        default_values: {
            settings: {
                type: "Without Featured",
                perPage: 5,
                order: "Most Recent First"
            }
        },
        config: {
            preview: function (self, callback) {
                callback('News Paper Block')
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
                            NewsPaperChooserField(WAGTAIL_IMAGE_SEARCH_URL),
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Name',
                                model: 'name'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'Max Height',
                                model: 'maxHeight'
                            },
                            {
                                type: 'input',
                                inputType: 'text',
                                label: 'News url',
                                model: 'newsUrl'
                            },
                        ]
                    }
                }
            ]

        }
    }

    hyperEditor.register_block('news_paper', NewsPaperBlock)
})()