from django.views.decorators.clickjacking import xframe_options_exempt
import numpy as np
from django.shortcuts import render, redirect, reverse
from django.http import JsonResponse, HttpResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import DocModel
import json
from django.views.decorators import gzip
import cv2
from .forms import DocumentForm
from django.conf import settings
model = settings.MODEL


class VideoCamera(object):
    def __init__(self, url=None):
        self.font = cv2.FONT_HERSHEY_SIMPLEX
        self.status = True
        self.org = (50, 80)
        self.fontScale = 1.4
        self.thickness = 3
        self.SIZE = (150, 150)
        self.THRESH = 0.5
        self.url = 0 if url is None else '.'+url
        self.video = cv2.VideoCapture(self.url)
        self.skipCount = 2
        self.prev = None
        self.fcount = 0

    def __del__(self):
        self.video.release()

    def get_frame(self):
        ret, image = self.video.read()
        if not ret:
            self.status = False
            pass

        if self.fcount % self.skipCount == 0:
            tmp = cv2.resize(image, self.SIZE)
            tmp = tmp / 255.0
            pred = model.predict(np.array([tmp]))
            string = "Suspicious" if pred[0][0] > self.THRESH else "Peaceful"
            string += f" {str(pred[0][0])}"
            self.prev = string

        else:
            string = self.prev

        color = (255, 255, 255)
        image = cv2.rectangle(image, (20, 20), (600, 100), (0, 200, 100), cv2.FILLED) if string.split(' ')[0] == 'Peaceful' else cv2.rectangle(
            image, (20, 20), (600, 100), (0, 0, 255), cv2.FILLED)
        image = cv2.putText(image, string, self.org, self.font,
                            self.fontScale, color, self.thickness, cv2.LINE_AA)
        ret, jpeg = cv2.imencode('.jpg', image)
        self.fcount += 1
        return jpeg.tobytes()


def gen(camera):
    while camera.status:
        frame = camera.get_frame()
        yield(b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@gzip.gzip_page
def Stream(request):
    try:
        entry = DocModel.objects.all().last()
        return StreamingHttpResponse(gen(VideoCamera(entry.vid.url)), content_type="multipart/x-mixed-replace;boundary=frame")
    except StreamingHttpResponse.HttpResponseServerError as e:
        print("aborted")


@gzip.gzip_page
def StreamToken(request, token):
    try:
        entry = DocModel.objects.filter(stoken=token).last()
        return StreamingHttpResponse(gen(VideoCamera(entry.vid.url)), content_type="multipart/x-mixed-replace;boundary=frame")
    except StreamingHttpResponse.HttpResponseServerError as e:
        print("aborted")


def HomeView(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('streamroom')

    else:
        form = DocumentForm()
        return render(request, 'home.html', {'form': form})


# @xframe_options_exempt
def StreamView(request):
    entry = DocModel.objects.all().last()
    if entry is None:
        return JsonResponse({'message': 'No Video Files Yet!'})
    return render(request, 'stream.html')


# API End Point
def StreamTokenView(request, token):
    try:
        entry = DocModel.objects.filter(stoken=token).last()
        if entry is None:
            return JsonResponse({'message': 'Token Not Registered'})

        return render(request, 'streamtoken.html', {'token': token})

    except DocModel.DoesNotExist:
        return JsonResponse({'message': 'Token Not Registered'})


@csrf_exempt
def APIEnd(request):
    if request.method == 'POST':
        try:
            stoken = request.POST['stoken']
            vidFile = request.FILES['vid']
            DocModel(stoken=stoken, vid=vidFile).save()
            baseurl = request.build_absolute_uri(reverse('home'))
            return JsonResponse({'status': 'ok', 'message': f'Files Received from sender {stoken}', 'vidurl': baseurl+'streamtoken/'+stoken})
        except:
            return HttpResponse(status=400)

    return JsonResponse({'status': 'Wait kro bhai'})
# Create your views here.
