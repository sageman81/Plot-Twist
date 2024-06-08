from django.shortcuts import redirect, render, get_object_or_404
from django.http import HttpResponse, JsonResponse, HttpResponseNotAllowed, HttpResponseRedirect

from django.contrib.auth.decorators import login_required
from .models import Review, PlotTwist
from .forms import ReviewForm, PlotTwistForm, SignUpForm
from django.contrib import messages
from django.contrib.auth import login, logout, authenticate
import requests     #TMDB API
from django.contrib.auth.models import User   #posting plot twist
import random
from django.db.models import Count, Sum
from django.middleware.csrf import get_token
import logging



# Custom logout view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
logger = logging.getLogger(__name__)

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
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Error fetching movie data: {response.status_code} {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        logger.error(f"Exception during TMDB API call: {e}")
        return None   


# def movie_detail(request, movie_id):
#     api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
#     response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}')
#     movie = response.json() if response.status_code == 200 else None

#     if not movie:
#         messages.error(request, 'Movie not found')
#         return redirect('reviews:movie_search')

#     plot_twists = PlotTwist.objects.filter(movie_id=movie_id).order_by('-votes')
#     form = PlotTwistForm()

#     if request.method == 'POST':
#         form = PlotTwistForm(request.POST)
#         if form.is_valid():
#             plot_twist = form.save(commit=False)
#             plot_twist.movie_id = movie_id
#             plot_twist.user = request.user
#             plot_twist.save()
#             return redirect('reviews:movie_detail', movie_id=movie_id)

#     return render(request, 'movie_detail.html', {'movie': movie, 'plot_twists': plot_twists, 'form': form})



# def movie_detail(request, movie_id):
#     api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
#     url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}'
#     response = requests.get(url)
#     if response.status_code == 200:
#         return JsonResponse(response.json(), safe=False)
#     else:
#         return JsonResponse({'error': 'Movie not found'}, status=404)

def movie_detail(request, movie_id):
    print("Movie ID received:", movie_id)  # Check if movie_id is received correctly
    api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
    url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}'
    response = requests.get(url)
    if response.status_code == 200:
        return JsonResponse(response.json(), safe=False)
    else:
        return JsonResponse({'error': 'Movie not found'}, status=404)





def submit_plot_twist(request, movie_id):
    if request.method == 'POST':
        form = PlotTwistForm(request.POST)
        if form.is_valid():
            plot_twist = form.save(commit=False)
            plot_twist.movie_id = movie_id
            plot_twist.user = request.user
            plot_twist.save()
            return JsonResponse({'status': 'success', 'plot_twist_id': plot_twist.id})
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
    return JsonResponse({'status': 'invalid method'}, status=405)




# def submit_plot_twist(request, movie_id):
#     if request.method == 'POST':
#         form = PlotTwistForm(request.POST)
#         if form.is_valid():
#             plot_twist = form.save(commit=False)
#             plot_twist.movie_id = movie_id
#             plot_twist.user = request.user
#             plot_twist.save()
#             return redirect('movie_detail', movie_id=movie_id)
#     else:
#         form = PlotTwistForm()
#     return render(request, 'submit_plot_twist.html', {'form': form})

def submit_plot_twist(request, movie_id):
    if request.method == 'POST':
        form = PlotTwistForm(request.POST)
        if form.is_valid():
            plot_twist = form.save(commit=False)
            plot_twist.movie_id = movie_id
            plot_twist.user = request.user
            plot_twist.save()
            return JsonResponse({'status': 'success', 'plot_twist_id': plot_twist.id})
        else:
            return JsonResponse({'status': 'error', 'errors': form.errors}, status=400)
    else:
        return JsonResponse({'status': 'invalid method'}, status=405)




def movie_search(request):
    query = request.GET.get('query', '')
    if query:
        movie_data = get_movie_data(query)
        if movie_data:
            return JsonResponse({'movies': movie_data.get('results', [])})
        else:
            return JsonResponse({'movies': []}, status=404)
    else:
        # No query provided, fetch popular movies
        popular_movies = get_popular_movies()
        if popular_movies:
            return JsonResponse({'movies': popular_movies})
        else:
            return JsonResponse({'movies': []}, status=404)


def get_popular_movies(request):
    
    api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
    url = f"https://api.themoviedb.org/3/movie/popular?api_key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return JsonResponse({'movies': response.json()['results']}, safe=False)
    else:
        return JsonResponse({'error': 'Failed to fetch popular movies'}, status=response.status_code)






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





def api_home(request):
    top_plot_twists = PlotTwist.objects.annotate(vote_count=Sum('votes')).order_by('-vote_count')[:5]
    plot_twists_with_movies = []

    for plot_twist in top_plot_twists:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{plot_twist.movie_id}?api_key=3c051ccfcf4b5e91dc38ecca9b825464')
        if response.status_code == 200:
            movie_details = response.json()
            plot_twists_with_movies.append({
                'movie_id': plot_twist.movie_id,
                'title': movie_details.get('title'),
                'poster_path': f"https://image.tmdb.org/t/p/w500{movie_details.get('poster_path')}",
                'description': movie_details.get('overview'),
                'release_date': movie_details.get('release_date')
            })
        else:
            logger.error(f"Error fetching movie details for movie ID {plot_twist.movie_id}: {response.text}")
            # It may be useful to append an error message or similar here if necessary

    return JsonResponse({'movies_with_most_twists': plot_twists_with_movies})





# def signup(request):
#     if request.method == 'POST':
#         form = SignUpForm(request.POST)
#         if form.is_valid():
#             user = form.save()
#             login(request, user)  
#             return redirect('home')  
#     else:
#         form = SignUpForm()
#     return render(request, 'registration/sign_up_form.html', {'form': form})





def random_movie(request):
    api_key = '3c051ccfcf4b5e91dc38ecca9b825464'
    url = f"https://api.themoviedb.org/3/movie/popular?api_key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        movies = response.json()['results']
        movie = random.choice(movies)
        return redirect('reviews:movie_detail', movie_id=movie['id'])
    else:
        messages.error(request, "Failed to fetch movies")
        return redirect('reviews:movie_search')





def upvote_plot_twist(request, plot_twist_id):
    if request.method == 'POST':
        plot_twist = get_object_or_404(PlotTwist, id=plot_twist_id)
        plot_twist.votes += 1
        plot_twist.save()
        return JsonResponse({'votes': plot_twist.votes})
   

    
def downvote_plot_twist(request, plot_twist_id):
    if request.method == 'POST':
        plot_twist = get_object_or_404(PlotTwist, id=plot_twist_id)
        plot_twist.votes -= 1
        plot_twist.save()
        return JsonResponse({'votes': plot_twist.votes})
    return JsonResponse({'error': 'Method not allowed'}, status=405)



def edit_plot_twist(request, plot_twist_id, movie_id):
    plot_twist = get_object_or_404(PlotTwist, id=plot_twist_id)

    if request.user == plot_twist.user or request.user.is_superuser:
        if request.method == 'POST':
            form = PlotTwistForm(request.POST, instance=plot_twist)
            if form.is_valid():
                form.save()
                messages.success(request, "Plot twist updated successfully.")
                return redirect('reviews:movie_detail', movie_id=movie_id)
        else:
            form = PlotTwistForm(instance=plot_twist)
    else:
        messages.error(request, "You do not have permission to edit this plot twist.")
        return redirect('reviews:movie_detail', movie_id=movie_id)

    return render(request, 'edit_plot_twist.html', {'form': form, 'plot_twist': plot_twist})



def delete_plot_twist(request, plot_twist_id, movie_id):
    plot_twist = get_object_or_404(PlotTwist, id=plot_twist_id)

    if request.user == plot_twist.user or request.user.is_superuser:
        if request.method == 'POST':
            plot_twist.delete()
            messages.success(request, "Plot twist deleted successfully.")
            return redirect('reviews:movie_detail', movie_id=movie_id)
    else:
        messages.error(request, "You do not have permission to delete this plot twist.")

    return redirect('reviews:movie_detail', movie_id=movie_id)


def api_top_plot_twists(request):
    top_plot_twists = PlotTwist.objects.annotate(vote_count=Sum('votes')).order_by('-vote_count')[:5]

    plot_twists_with_movies = []
    for plot_twist in top_plot_twists:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{plot_twist.movie_id}?api_key=3c051ccfcf4b5e91dc38ecca9b825464')
        if response.status_code == 200:
            movie_details = response.json()
            plot_twists_with_movies.append({
                'plot_twist_id': plot_twist.id,
                'description': plot_twist.description,
                'votes': plot_twist.vote_count,
                'movie_title': movie_details.get('title'),
                'poster_path': f"https://image.tmdb.org/t/p/w500{movie_details.get('poster_path')}"
            })

    return JsonResponse({
        'plot_twists': plot_twists_with_movies
    })




def home_view(request):
    # Your code here, for example:
    return render(request, 'reviews/home.html')


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

# Login using Django REST Framework's token authentication
class CustomAuthToken(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            })
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

# Custom logout view
class LogoutView(APIView):
    def post(self, request):
        try:
            request.user.auth_token.delete()
        except (AttributeError, Token.DoesNotExist):
            pass
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        # For handling JSON data
        import json
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')  # Assuming you want to use email, adjust accordingly

        if not (username and password):
            return JsonResponse({'error': 'Username and password required'}, status=400)

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=409)

        # Create user
        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()

        # Optionally create a token at signup
        token = Token.objects.create(user=user)

        return JsonResponse({'message': 'User created successfully', 'token': token.key}, status=201)
    else:
        return JsonResponse({'error': 'Invalid method'}, status=405)







