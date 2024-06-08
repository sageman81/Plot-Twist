"""
URL configuration for plot_twist project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path, re_path
from django.contrib import admin
from reviews.views import signup, upvote_plot_twist, downvote_plot_twist, edit_plot_twist, delete_plot_twist, movie_detail, api_top_plot_twists, movie_search, get_popular_movies, get_popular_movies, api_home, csrf, CustomAuthToken, LogoutView

from django.views.generic import TemplateView #to frontend

urlpatterns = [
    path('admin/', admin.site.urls),
    path('reviews/', include('reviews.urls', namespace='reviews')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='home'), 
    path('api/home/', api_home, name='api-home'),

    path('signup/', signup, name='signup'),
    path('plot_twist/<int:plot_twist_id>/upvote/', upvote_plot_twist, name='upvote_plot_twist'),
    path('plot_twist/<int:plot_twist_id>/downvote/', downvote_plot_twist, name='downvote_plot_twist'),
    path('plot_twist/<int:movie_id>/<int:plot_twist_id>/edit/', edit_plot_twist, name='edit_plot_twist'),
    path('plot_twist/<int:movie_id>/<int:plot_twist_id>/delete/', delete_plot_twist, name='delete_plot_twist'),
    path('movie/<int:movie_id>/', movie_detail, name='movie_detail'),
    path('api/top-plot-twists/', api_top_plot_twists, name='api-top-plot-twists'),
    path('movie_search/', movie_search, name='movie_search'),
    path('api/popular_movies/', get_popular_movies, name='popular_movies'),
    path('api/movie/<int:movie_id>/', movie_detail, name='movie_detail_api'),
    path('api/csrf/', csrf, name='csrf'),
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')), #to frontend, moved to the end


    path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('api-logout/', LogoutView.as_view(), name='api_logout'),
    


]

