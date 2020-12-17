import os
import io
from django.db import models
from datetime import datetime
from oscar.core.loading import get_model
from docxtpl import DocxTemplate
from django.core.files import File
import subprocess
from constance import config
from django.conf import settings
import tempfile
from ecommerce.quotation.docx import prepare_custom_json

Order = get_model('order', 'Order')


def get_file_path(instance, filename):
    quotation_dir = getattr(settings, 'QUOTATION_DIR', 'quotations')
    today = datetime.now()
    filename = "%s_%s" % (instance.id, filename)
    return os.path.join(
        quotation_dir,
        today.strftime("%Y"),
        today.strftime("%m"),
        today.strftime("%d"),
        filename
    )


class Quotation(models.Model):
    generated_docx = models.FileField(upload_to=get_file_path, max_length=255, blank=True, null=True)
    generated_pdf = models.FileField(upload_to=get_file_path, max_length=255, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def build(self):
        template = DocxTemplate(os.path.join(settings.MEDIA_ROOT, config.quotation_template))
        stream = io.BytesIO()
        template.render(context=prepare_custom_json(self.order.get_order_config_dict()))
        template.save(stream)
        self.generated_docx.save('quotation.docx', File(stream), True)
        self.generatePDF()

    @classmethod
    def generate(cls, order):
        quote = cls.objects.create(order=order)
        return quote

    def generatePDF(self):
        filename = f'{self.id}_quotation.pdf'
        output_dir = tempfile.gettempdir()
        context = {
            '[output_dir]': output_dir,
            '[output_path]': os.path.join(tempfile.gettempdir(), filename),
            '[input_path]': self.generated_docx.path
        }
        command = config.pdf_generation_command
        for key, val in context.items():
            command = command.replace(key, val)
        subprocess.call(command, shell=True)
        output_file = os.path.join(output_dir, filename)
        with open(output_file, 'rb') as pdffile:
            self.generated_pdf.save('quotation.pdf', File(pdffile), True)
        os.remove(output_file)

    def __str__(self):
        return str(self.order)
