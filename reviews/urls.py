from django.urls import path
from . import views
from .views import movie_search 

app_name = 'reviews' 

urlpatterns = [
    path('', views.index, name='index'),  # Accessible via /reviews/
    path('<int:review_id>/', views.detail, name='detail'),  # Accessible via /reviews/1, /reviews/2, etc.
    path('search/', movie_search, name='movie_search'),
]

