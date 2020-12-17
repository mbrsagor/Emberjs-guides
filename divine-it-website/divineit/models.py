from django import forms
from django.db import models
from django.template.defaultfilters import slugify
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from wagtail.admin.edit_handlers import (FieldPanel, FieldRowPanel,
                                         InlinePanel, ObjectList,
                                         PageChooserPanel, TabbedInterface)
from wagtail.core.models import ClusterableModel, Orderable, Page
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index
from wagtail.snippets.models import register_snippet
from wagtailhyper.fields import HyperField, HyperFieldPanel
from django.db.models.signals import pre_save

from base.models import Page


class News(index.Indexed, models.Model):
    date = models.DateField()
    title = models.CharField(max_length=255)
    detailsUrl = models.CharField(max_length=255, blank=True, null=True, default=None)
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
    )
    content = HyperField(default='[]')
    expires = models.DateField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    enabled = models.BooleanField(default=True)

    panels = [
        FieldRowPanel([
            FieldPanel('enabled'),
            FieldPanel('featured'),
        ], classname="clearfix pb-20 pt-20"),
        FieldRowPanel([
            FieldPanel('date'),
            FieldPanel('expires'),
        ], classname="clearfix pb-20"),
        FieldRowPanel([
            ImageChooserPanel('image')
        ], classname="clearfix pb-20"),
        FieldRowPanel([
            FieldPanel('title'),
        ], classname="clearfix pb-20"),

        FieldRowPanel([
            FieldPanel('detailsUrl'),
        ], classname="clearfix pb-20"),

         HyperFieldPanel('content')
    ]

    search_fields = [
        index.SearchField('title', partial_match=True),
        index.SearchField('content', partial_match=True),
    ]

class Event(index.Indexed, models.Model):
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True, null=True)
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
    )
    content = HyperField(default='[]')
    featured = models.BooleanField(default=False)
    enabled = models.BooleanField(default=True)

    panels = [
        FieldRowPanel([
            FieldPanel('enabled'),
            FieldPanel('featured'),
        ], classname="clearfix pb-20 mt-20"),
        FieldRowPanel([
            FieldPanel('start_date'),
            FieldPanel('end_date'),
        ], classname="clearfix pb-20"),
        FieldRowPanel([
            ImageChooserPanel('image')
        ], classname="clearfix pb-20"),
        FieldRowPanel([
            FieldPanel('title'),
        ], classname="clearfix pb-20"),
        FieldRowPanel([
            FieldPanel('slug'),
        ], classname="clearfix pb-20"),
        HyperFieldPanel('content')
    ]

    search_fields = [
        index.SearchField('title', partial_match=True),
        index.SearchField('content', partial_match=True),
    ]

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Industry(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Product(ClusterableModel):
    name = models.CharField(max_length=255)
    page = models.ForeignKey('base.StandardPage', on_delete=models.PROTECT, blank=True, null=True)
    panels = [
        FieldPanel('name'),
        PageChooserPanel('page'),
        InlinePanel('related_solution_to_product', label='Solutions')
    ]
    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=255)
    page = models.ForeignKey('base.StandardPage', on_delete=models.PROTECT, blank=True, null=True)
    panels = [
        FieldPanel('name'),
        PageChooserPanel('page'),
    ]
    def __str__(self):
        return self.name


class Solution(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class RelatesSolutionToProduct(Orderable, Solution):
    product = ParentalKey('Product', related_name='related_solution_to_product')


RATING_CHOICES = list(map(lambda x: (x, x), range(30)))

class Customer(ClusterableModel):
    company_name = models.CharField(max_length=255)
    background_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name='customer_bg_image'
    )
    company_short_description = models.CharField(max_length=255, default='', null=True, blank=True)
    logo =  models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
    )
    num_of_employees = models.PositiveIntegerField(null=True, blank=True)
    address_line_1 = models.CharField(max_length=255, null=True, blank=True)
    address_line_2 = models.CharField(max_length=255, null=True, blank=True)
    telephone_1 = models.CharField(max_length=30, null=True, blank=True)
    telephone_2 = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    website = models.URLField(max_length=255, blank=True, null=True)
    industries = ParentalManyToManyField('divineit.Industry', blank=True)
    products = ParentalManyToManyField('divineit.Product', blank=True)
    services = ParentalManyToManyField('divineit.Service', blank=True)
    solutions = ParentalManyToManyField('divineit.Solution', blank=True)
    rating = models.PositiveIntegerField(choices=RATING_CHOICES, default=0, help_text='Largest = View First, Lowest = View Last')
    show_in_site = models.BooleanField(default=True)
    show_case_study = models.BooleanField(default=False)

    general_panel = [
        FieldPanel('company_name'),
        ImageChooserPanel('background_image'),
        FieldPanel('company_short_description'),
        ImageChooserPanel('logo'),
        FieldPanel('num_of_employees'),
        FieldPanel('address_line_1'),
        FieldPanel('address_line_2'),
        FieldPanel('telephone_1'),
        FieldPanel('telephone_2'),
        FieldPanel('email'),
        FieldPanel('website'),
        FieldPanel('rating'),
        FieldPanel('show_in_site'),
        FieldPanel('show_case_study')
    ]

    relation_panel = [
        FieldPanel('industries', widget=forms.CheckboxSelectMultiple),
        FieldPanel('products', widget=forms.CheckboxSelectMultiple),
        FieldPanel('services', widget=forms.CheckboxSelectMultiple),
        FieldPanel('solutions', widget=forms.CheckboxSelectMultiple)
    ]

    edit_handler = TabbedInterface([
        ObjectList(general_panel, heading='General'),
        ObjectList(relation_panel, heading='Products & Services'),
    ])

    def __str__(self):
        return self.company_name

class ContactPerson(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.PROTECT)
    name = models.CharField(max_length=255)
    profile_pic = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
    )
    designation = models.CharField(max_length=255, blank=True, null=True)
    contact_number = models.CharField(max_length=255, blank=True, null=True)
    feedback = models.TextField(blank=True, null=True)
    panels = [
        FieldPanel('customer'),
        FieldPanel('name'),
        ImageChooserPanel('profile_pic'),
        FieldPanel('designation'),
        FieldPanel('contact_number'),
        FieldPanel('feedback'),
    ]

    def __str__(self):
        return self.name

class Career(index.Indexed, ClusterableModel):
    date = models.DateField(blank=True, null=True)
    title = models.CharField(max_length=155)
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
    )
    expires = models.DateField(blank=True, null=True)
    enabled = models.BooleanField(default=True)
    job_type = models.TextField(blank=True, null=True)
    experience = models.TextField(blank=True, null=True)
    salary = models.TextField(blank=True, null=True)
    apply_link = models.TextField(blank=True, null=True)
    description = HyperField(default='[]')

    panels = [
        FieldPanel('enabled'),
        FieldPanel('date'),
        FieldPanel('expires'),
        FieldPanel('title'),
        FieldPanel('job_type'),
        FieldPanel('experience'),
        FieldPanel('salary'),
        FieldPanel('apply_link'),
        ImageChooserPanel('image'),
        HyperFieldPanel('description'),
    ]

    search_fields = [
        index.SearchField('title', partial_match=True),
        index.SearchField('description', partial_match=True),
    ]

class CustomField(models.Model):
    label = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

class RelatesCustomFieldToCarrer(Orderable, CustomField):
    career = ParentalKey('Career', related_name='related_custom_fields_to_carrer')

class KBCategory(ClusterableModel):

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True, null=True)
    product = models.ForeignKey(Product, blank=True, null=True, on_delete=models.PROTECT)
    service = models.ForeignKey(Service, blank=True, null=True, on_delete=models.PROTECT)

    panels = [
        FieldPanel('name'),
        FieldPanel('slug'),
        FieldPanel('product'),
        FieldPanel('service'),
        InlinePanel('sub_categories', label='Sub Categories'),
    ]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class KBSubCategory(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class KBSubCategoryRelatesToKBcategory(Orderable, KBSubCategory):
    parent = ParentalKey('KBCategory', related_name='sub_categories')

class Knowledge(index.Indexed, models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(KBCategory, blank=True, null=True, on_delete=models.PROTECT)
    sub_category = models.ForeignKey(KBSubCategory, blank=True, null=True, on_delete=models.PROTECT)
    content = HyperField(default='[]')

    panels = [
        FieldPanel('title'),
        FieldPanel('category'),
        FieldPanel('sub_category'),
        HyperFieldPanel('content')
    ]

    search_fields = [
        index.SearchField('title', partial_match=True),
        index.SearchField('content', partial_match=True),
    ]

    def __str__(self):
        return self.title
