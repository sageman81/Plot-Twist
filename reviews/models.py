from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class PlotTwist(models.Model):
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Review(models.Model):
    movie = models.CharField(max_length=255)
    review = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
