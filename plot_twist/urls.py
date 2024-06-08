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
from django.urls import include, path
from django.contrib import admin
from reviews.views import home, signup, login_view
from reviews.views import upvote_plot_twist, downvote_plot_twist, edit_plot_twist, delete_plot_twist, movie_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('reviews/', include('reviews.urls', namespace='reviews')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', home, name='home'),
    path('signup/', signup, name='signup'),
    path('login/', login_view, name='login'),
    path('plot_twist/<int:plot_twist_id>/upvote/', upvote_plot_twist, name='upvote_plot_twist'),
    path('plot_twist/<int:plot_twist_id>/downvote/', downvote_plot_twist, name='downvote_plot_twist'),
    path('plot_twist/<int:movie_id>/<int:plot_twist_id>/edit/', edit_plot_twist, name='edit_plot_twist'),
    path('plot_twist/<int:movie_id>/<int:plot_twist_id>/delete/', delete_plot_twist, name='delete_plot_twist'),
    path('movie/<int:movie_id>/', movie_detail, name='movie_detail'),

]

