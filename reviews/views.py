from django.shortcuts import redirect, render
from django.http import HttpResponse
from .models import Review, PlotTwist  # Import PlotTwist if I plan to use it
from .forms import ReviewForm, PlotTwistForm, SignUpForm
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
import requests     #TMDB API
from django.contrib.auth.models import User   #posting plot twists


def index(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')  # Redirect back to the index page after posting
    else:
        form = ReviewForm()

    reviews = Review.objects.all()
    return render(request, 'reviews/index.html', {'reviews': reviews, 'form': form})

def detail(request, review_id):
    try:
        review = Review.objects.get(id=review_id)
        return render(request, 'reviews/detail.html', {'review': review})
    except Review.DoesNotExist:
        return HttpResponse("Review not found.", status=404)

def logout_view(request):
    messages.add_message(request, messages.INFO, 'You have been logged out.')
    logout(request)
    return redirect('login') 

def get_movie_data(title):
    api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
    url = f"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={title}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None


def movie_detail(request, movie_id):
    api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
    response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}')
    movie = response.json() if response.status_code == 200 else None
    if movie:
        return render(request, 'movie_detail.html', {'movie': movie})
    else:
        messages.error(request, 'Movie not found')
        return redirect('reviews:movie_search')


def submit_plot_twist(request, movie_id):
    if request.method == 'POST':
        form = PlotTwistForm(request.POST)
        if form.is_valid():
            plot_twist = form.save(commit=False)
            plot_twist.movie_id = movie_id
            plot_twist.user = request.user
            plot_twist.save()
            return redirect('movie_detail', movie_id=movie_id)
    else:
        form = PlotTwistForm()
    return render(request, 'submit_plot_twist.html', {'form': form})

def movie_search(request):
    query = request.GET.get('query', '')
    movie_data = get_movie_data(query) if query else None
    popular_movies = get_popular_movies() if not query else None  
    return render(request, 'reviews/movie_search.html', {'movie_data': movie_data})


def get_popular_movies():
    api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
    url = f"https://api.themoviedb.org/3/movie/popular?api_key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()['results']
    else:
        return None

def get_top_rated_movies():
    api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
    url = f"https://api.themoviedb.org/3/movie/top_rated?api_key={api_key}"
    response = requests.get(url)
    print("API Response Status:", response.status_code)  # Debugging
    if response.status_code == 200:
        return response.json()['results']
    else:
        print("Failed to fetch top-rated movies:", response.text)  # Debugging
        return None


def home(request):
    top_rated_movies = get_top_rated_movies()
    return render(request, 'home.html', {'top_rated_movies': top_rated_movies})

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Log the user in immediately after signing up
            return redirect('home')  # Redirect to a desired page
    else:
        form = SignUpForm()
    return render(request, 'registration/sign_up_form.html', {'form': form})