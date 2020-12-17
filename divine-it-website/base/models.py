from django.db import models
from django.core.validators import RegexValidator
from wagtail.admin.edit_handlers import (FieldPanel, MultiFieldPanel,
                                         ObjectList,
                                         TabbedInterface)
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.contrib.settings.models import BaseSetting, register_setting
from wagtail.core.fields import StreamField
from wagtail.images.edit_handlers import ImageChooserPanel

from wagtail.snippets.models import register_snippet
from django.conf import settings
from modelcluster.contrib.taggit import ClusterTaggableManager
from taggit.models import TaggedItemBase
from modelcluster.fields import ParentalKey
from wagtailhyper.fields import HyperField, HyperFieldPanel
from wagtailhyper.models import WagtailHyperPage
from wagtail.search import index

AVIABLE_THEMES = getattr(settings, 'AVIABLE_THEMES', ['default'])

AVIABLE_THEMES = list(map(lambda x: (x, x), AVIABLE_THEMES))

CHANGE_FREQUENCY_CHOICES = [(item, item) for item in
                            ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]]


class Page(WagtailHyperPage):
    primary_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    seo_keyword = models.CharField(max_length=250, blank=True, null=True)
    content = HyperField(blank=True, null=True, default="[]")

    og_title = models.CharField(max_length=255, blank=True, null=True)

    og_description = models.TextField(blank=True, null=True)

    og_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    head_context = models.TextField(max_length=1000, blank=True, null=True, default=None)
    select_template = models.CharField(max_length=255, blank=True, null=True)

    include_in_sitemap = models.BooleanField(default=True)
    priority = models.DecimalField(max_digits=4, decimal_places=2, default=0.8)
    changefreq = models.CharField(max_length=15, choices=CHANGE_FREQUENCY_CHOICES, default="daily")

    promote_panels = [
        MultiFieldPanel([
            FieldPanel('slug'),
            FieldPanel('seo_title'),
            FieldPanel('show_in_menus'),
            FieldPanel('search_description'),
            FieldPanel('seo_keyword'),
            FieldPanel('head_context')
        ], heading='Common Configuration'),

        MultiFieldPanel(
            [
                FieldPanel('og_title'),
                FieldPanel('og_description'),
                ImageChooserPanel('og_image'),
            ],
            heading="Open Graph"
        )
    ]

    search_fields = WagtailHyperPage.search_fields + [  # Inherit search_fields from Page
        index.SearchField('content', partial_match=True),
        index.SearchField('search_description'),
    ]

    content_panels = WagtailHyperPage.content_panels + [
        ImageChooserPanel('primary_image'),
        HyperFieldPanel('content'),
    ]

    settings_panels = WagtailHyperPage.settings_panels + [
        FieldPanel('select_template'),
        MultiFieldPanel([
            FieldPanel('include_in_sitemap'),
            FieldPanel('priority'),
            FieldPanel('changefreq')
        ], heading='Sitemap Settings')
    ]

    class Meta:
        abstract = True

    def get_template(self, request, *args, **kwargs):
        templ = super(Page, self).get_template(request, *args, **kwargs)
        if self.select_template:
            return self.select_template
        return templ

    def get_sitemap_urls(self):
        if self.include_in_sitemap:
            return [
                {
                    'location': self.full_url,
                    'lastmod': (self.last_published_at or self.latest_revision_created_at),
                    'priority': "{:.1f}".format(self.priority),
                    'changefreq': self.changefreq
                }
            ]
        else:
            return []


class StandardPageTag(TaggedItemBase):
    content_object = ParentalKey('StandardPage', on_delete=models.CASCADE, related_name='tagged_items')


class StandardPage(Page):
    tags = ClusterTaggableManager(through=StandardPageTag, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('tags'),
    ]


@register_snippet
class BasicSnippet(models.Model):
    title = models.CharField(max_length=255)

    content = HyperField()

    panels = [
        FieldPanel('title'),
        HyperFieldPanel('content')
    ]

    def __str__(self):
        return self.title


@register_setting
class ApplicationSettings(BaseSetting):
    theme = models.CharField(help_text='Select which theme to use', max_length=255, choices=AVIABLE_THEMES,
                             default='default')

    website_logo = models.ImageField(blank=True, null=True)

    website_favicon_icon = models.ImageField(blank=True, null=True)

    product_toolbar_base_url = models.URLField(blank=True, null=True)

    footer = models.ForeignKey(
        'base.BasicSnippet',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    header_top = models.ForeignKey(
        'base.BasicSnippet',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    footer_logo = models.ImageField(blank=True, null=True)

    google_analytics_key = models.CharField(max_length=255, blank=True, null=True)
    gtags_container_id = models.CharField(max_length=255, blank=True, null=True)

    facebook_app_id = models.CharField(max_length=255, blank=True, null=True)
    facebook_admins = models.CharField(max_length=255, blank=True, null=True)

    open_graph_type = models.CharField(max_length=30, default="website", blank=True, null=True)

    facebook_url = models.URLField(help_text='Your Facebook page URL', blank=True, null=True)
    instagram_url = models.URLField(help_text='Your Instagram URL', blank=True, null=True)
    twitter_url = models.URLField(help_text='Your Twitter URL', blank=True, null=True)
    google_plus_url = models.URLField(help_text='Your google plus URL', blank=True, null=True)
    youtube_url = models.URLField(help_text='Your YouTube channel or user account URL', blank=True, null=True)
    linkedin_url = models.URLField(help_text='Your linkedin URL', blank=True, null=True)

    recaptcha_public_key = models.CharField(max_length=255, blank=True, null=True)
    recaptcha_private_key = models.CharField(max_length=255, blank=True, null=True)

    extra_header_context = models.TextField(max_length=2000, blank=True, null=True, default=None)

    general_settings_panel = [
        FieldPanel('theme'),
        FieldPanel('website_logo'),
        FieldPanel('website_favicon_icon'),
        SnippetChooserPanel('header_top'),
        SnippetChooserPanel('footer'),
        FieldPanel('footer_logo'),
        FieldPanel('google_analytics_key'),
        FieldPanel('gtags_container_id'),
        FieldPanel('recaptcha_public_key'),
        FieldPanel('recaptcha_private_key'),
        FieldPanel('product_toolbar_base_url'),
        FieldPanel('extra_header_context'),
    ]

    social_settings_panels = [
        MultiFieldPanel(
            [
                FieldPanel('facebook_url'),
                FieldPanel('instagram_url'),
                FieldPanel('twitter_url'),
                FieldPanel('google_plus_url'),
                FieldPanel('youtube_url'),
                FieldPanel('linkedin_url')
            ],
            heading='Social Links'
        ),
        MultiFieldPanel(
            [
                FieldPanel('facebook_app_id'),
                FieldPanel('facebook_admins'),
            ],
            heading='Facebook App'
        ),
        MultiFieldPanel(
            [
                FieldPanel('open_graph_type'),
            ],
            heading='Open Graph'
        ),
    ]

    edit_handler = TabbedInterface([
        ObjectList(general_settings_panel, heading='General'),
        ObjectList(social_settings_panels, heading='Social & SEO'),
    ])


class PaymentVerify(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Phone number must be entered in the format: '+880121234543'. Up to 15 digits allowed.")
    phone = models.CharField(max_length=25, validators=[phone_regex])
    email = models.CharField(max_length=25)
    txn_id = models.CharField(max_length=25)
    payment_method = models.CharField(max_length=25)
    team_name = models.CharField(max_length=50)
    leader_name = models.CharField(max_length=50)
    member_one_name = models.CharField(max_length=50)
    member_two_name = models.CharField(max_length=50)
    member_three_name = models.CharField(max_length=50)
    leader_email = models.EmailField(unique=False)
    university_name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    session = models.CharField(max_length=100)
    leader_phone = models.CharField(max_length=100, validators=[phone_regex])

    def __str__(self):
        return self.team_name


class UpcomingEvent(models.Model):
    full_name = models.CharField(max_length=30)
    department_name = models.CharField(max_length=30)
    id_no = models.CharField(max_length=25, null=True, blank=True, default=None)
    email = models.EmailField(null=True, blank=True, default=None)
    session = models.CharField(max_length=14)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,14}$',
                                 message="Phone number must be entered in the format: '+880121234543'. Up to 14 digits allowed.")
    contact_number = models.CharField(max_length=14, validators=[phone_regex])
    emergency_contact_number = models.CharField(max_length=14, validators=[phone_regex])
    linkedIn_profile = models.URLField()
    drop_resume = models.FileField(upload_to='UpcomingEvent', blank=True, null=True)
    profile_photo = models.ImageField(upload_to='UpcomingEvent', blank=True, null=True)
    about_yourself = models.TextField()
    three_best_skill = models.TextField()
    experience = models.CharField(max_length=500)
    public_speaking = models.CharField(max_length=100)
    technical_skills = models.TextField()
    why_join_us = models.TextField()
    SDC_future_goal = models.TextField(max_length=500)
    involved_any_other_club = models.CharField(max_length=500)
    do_you_for_SDC = models.CharField(max_length=70)

    def __str__(self):
        return self.full_name


class EmailSubscription(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()

    def __str__(self):
        return self.name


class ContentForm3(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,14}$',
                                 message="Phone number must be entered in the format: '+880121234543'. Up to 14 digits allowed.")
    phone = models.CharField(max_length=25, validators=[phone_regex])
    email_address = models.EmailField(max_length=25)
    company_name = models.CharField(max_length=90, blank=True, null=True)
    message = models.TextField()

    def __str__(self):
        return self.first_name
