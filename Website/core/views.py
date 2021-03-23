from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DocModel
import json


def HomeView(request):
    return render(request, 'home.html')


@csrf_exempt
def APIEnd(request):
    if request.method == 'POST':
        try:
            fdata = json.loads(request.body.decode())
            stoken = fdata['stoken']
            return JsonResponse({'status': 'ok', 'message': f'Files Received from sender {stoken}'})
        except:
            return HttpResponse(status=400)

    return JsonResponse({'status': 'Wait kro bhai'})
# Create your views here.
