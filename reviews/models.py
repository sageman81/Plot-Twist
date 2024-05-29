from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class PlotTwist(models.Model):
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.content

class Review(models.Model):
    movie = models.CharField(max_length=255)
    review = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
