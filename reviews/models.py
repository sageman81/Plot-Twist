from django.db import models

from django.contrib.auth.models import User
# Create your models here.


class PlotTwist(models.Model):
    movie_id = models.IntegerField()  
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    votes = models.IntegerField(default=0)  # Stores net upvotes - downvotes
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.content

class Review(models.Model):
    movie = models.CharField(max_length=255)
    review = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


