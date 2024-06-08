from django.urls import include, path
from . import views
from .views import movie_search, index, detail, random_movie 
from django.contrib.auth import views as auth_views

app_name = 'reviews' 

urlpatterns = [
    path('', views.index, name='index'),  
    path('<int:review_id>/', views.detail, name='detail'), 
    path('search/', movie_search, name='movie_search'),
    path('movie/<int:movie_id>/', views.movie_detail, name='movie_detail'),
    path('random/', random_movie, name='random_movie'), 
    path('signup/', views.signup, name='signup'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', views.logout_view, name='logout'),
   
]

