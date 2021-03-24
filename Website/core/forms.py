from django import forms
from .models import DocModel

class DocumentForm(forms.ModelForm):
    class Meta:
        model = DocModel
        fields = ('vid', )