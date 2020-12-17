from django.conf import settings


def prepare_custom_json(original_json):
    order_list = []
    for order in original_json['lines']:

        if order['attributes'].get(settings.CUSTOMIZABLE_PRODUCT_OPTION_CODE):
            cart = []

            key_dict_list = [
                dict(
                    name='Software License',
                    key_list=['USER', 'SOFTWARE']
                ),
                dict(
                    name='Implementation',
                    key_list=['REQUIREMENT', 'DEPLOYMENT', 'CONFIGURATION', 'ONSITE_SUPPORT', 'TRAINING', 'PROJECT']
                ),
                dict(
                    name='Software Customization',
                    key_list=['SOFTWARE_CUSTOM', 'SOFTWARE_REPORT']
                ),
                dict(
                    name='Consultancy Services',
                    key_list=['CONSULTANT']
                ),
                dict(
                    name='Annual Maintenance Cost',
                    key_list=['AMC']
                )
            ]

            append_cart_item(order, cart, key_dict_list)

            order_list.append(dict(
                product_title=order['title'],
                price=order['unit_price_incl_tax'],
                cart=cart,
                is_custom=True
            ))
        else:
            order_list.append(dict(
                product_title=order['title'],
                price=order['unit_price_incl_tax'],
                is_custom=False
            ))

    custom_json = dict(
        billing_address=original_json['billing_address'],
        currency=original_json['currency'],
        total_price=original_json['total_incl_tax'],
        date=original_json['date_placed'],
        user=original_json['user'],
        orders=order_list
    )

    return custom_json


def prepare_user_data(users, items):
    user_license = {}
    for key, value in users.items():
        if key == 'items':
            for item in value:
                items.append(item)

    return user_license


def prepare_software_module_data(softwares, items):
    for key, value in softwares.items():
        if key == 'items':
            for module in value:
                sub_software_module = []

                for sub_module in softwares['subitems']:
                    if module['app'] == sub_module['app']:
                        sub_software_module.append(sub_module)

                module.update(dict(
                    sub_items=sub_software_module
                ))

                items.append(module)


def prepare_cart_item_data(order, key_list, items):
    total_price = 0
    for key in key_list:
        configuration = order['attributes'].get('configuration')
        if configuration is None:
            continue
        cart_item = configuration['cart']['sections'][key]

        if key == 'USER' or key == 'SOFTWARE':
            if key == 'USER':
                prepare_user_data(cart_item, items)
                user_license_price = cart_item['price']
                total_price += user_license_price
            if key == 'SOFTWARE':
                prepare_software_module_data(cart_item, items)
                software_price = cart_item['price']
                total_price += software_price
        else:
            total_price += cart_item['price']
            main_item = cart_item['items'][0]
            sub_items = cart_item['subitems']

            main_item.update(dict(
                sub_items=sub_items
            ))

            items.append(main_item)

    return total_price


def append_cart_item(order, cart, key_dict_list):
    for key_dict in key_dict_list:
        items = []
        total_price = prepare_cart_item_data(order, key_dict['key_list'], items)

        if total_price == 0:
            print (key_dict['name'])

        cart.append(dict(
            name=key_dict['name'],
            price=total_price,
            items=items
        ))
