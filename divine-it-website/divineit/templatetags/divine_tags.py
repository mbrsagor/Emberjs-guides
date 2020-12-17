from django import template
from django.utils.safestring import mark_safe
from wagtail.images.models import Image
register = template.Library()


@register.simple_tag
def image(img, lazy=True):
    wagtail_image = Image.objects.get(pk=int(img.get('id')))

    if img['attr'].get('width'):
        red_command = 'width-%s' % img['attr'].get('width')

        if img['attr'].get('height'):
            red_command = 'fill-%sx%s' % (img['attr'].get('width'), img['attr'].get('height'))

            if img['attr'].get('crop'):
                red_command = '%s-c%s' % (red_command, img['attr']['cropNearFocus'])
    elif img['attr'].get('height'):
        red_command = 'height-%s' % img['attr'].get('height')
    else:
        red_command = 'original'

    redintion = wagtail_image.get_rendition(red_command)

    alt = redintion.alt
    if img['attr'].get('alt'):
        alt = 'alt="%s"' % img['attr'].get('alt')

    source_and_class = f'data-src="{redintion.url}" class="lazy img-fluid"'
    if not lazy:
        source_and_class = f'src="{redintion.url}" class="img-fluid"'

    return mark_safe(f'''
            <img {source_and_class} width="{redintion.width}" height="{redintion.height}" title="{alt}" alt="{alt}" />
        ''')

