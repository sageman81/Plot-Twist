from django import forms
from .models import Review
from .models import PlotTwist

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['movie', 'review']

class PlotTwistForm(forms.ModelForm):
    class Meta:
        model = PlotTwist
        fields = ['description', 'user']       