(function () {
    var MenuBlock = {
        title: 'Menu',
        description: 'Site Menu',
        default_values: {
            extra: {},
            settings: {
                dropdownLevel: 1,
                templateName: 'default_menu.html'
            }
        },
        settings_schema: {
            fields: [
                {
                    type: 'select',
                    label: 'Select Menu',
                    model: 'menuCode',
                    required: true,
                    values: JSON.parse(MENUS)
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Max Dropdown Level',
                    model: 'dropdownLevel',
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Template Name',
                    model: 'templateName',
                }
            ]
        },
        config: {
            styles: [
                {id: 'default', name: 'Default'},
                {id: 'left_with_logo', name: 'Left With Logo'},
                {id: 'left_without_logo', name: 'Left Without Logo'},
                {id: 'default', name: 'Right With Logo'},
                {id: 'right_without_logo', name: 'Right Without Logo'},
                {id: 'as_list', name: 'As List'}
            ],
            preview(self, callback) {
                callback('List')
            }
        }
    }

    hyperEditor.register_block('menu', MenuBlock)
})()