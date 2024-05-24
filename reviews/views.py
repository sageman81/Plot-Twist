# from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.






def index(request):
    return HttpResponse("Hello, world. You're at the reviews index.")



def detail(request, review_id):
    return HttpResponse(f"You are viewing review {review_id}.")