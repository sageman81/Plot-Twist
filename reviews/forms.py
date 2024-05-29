from django import forms
from .models import Review, PlotTwist
from django.contrib.auth.forms import UserCreationForm, User



class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['movie', 'review']

class PlotTwistForm(forms.ModelForm):
    class Meta:
        model = PlotTwist
        fields = ['description', 'user']       

class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Required. Inform a valid email address.')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')