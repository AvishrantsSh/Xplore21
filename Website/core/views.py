from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DocModel


def HomeView(request):
    return render(request, 'home.html')


@csrf_exempt
def APIEnd(request):
    if request.method == 'POST':
        try:
            stoken = request.POST['stoken']
            # vid = request.FILES['video']
            return JsonResponse({'status': 'ok', 'message': f'Files Received from sender {23}'})
        except:
            return HttpResponse(status=400)

    return JsonResponse({'status': 'Wait kro bhai'})
# Create your views here.
