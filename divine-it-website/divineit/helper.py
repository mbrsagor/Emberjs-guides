from wagtail.admin.edit_handlers import extract_panel_definitions_from_model_class

def extract_panel_definitions_from_django_model_form(form):
    panels = extract_panel_definitions_from_model_class(form.Meta.model, exclude=form.Meta.exclude)
    import pdb; pdb.set_trace()