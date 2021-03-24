from django.views.decorators.clickjacking import xframe_options_exempt
import numpy as np
from django.shortcuts import render, redirect
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
        self.org = (10, 40)
        self.fontScale = 0.7
        self.thickness = 1
        self.SIZE = (150, 150)
        self.THRESH = 0.5
        self.url = 0 if url is None else '.'+url
        self.video = cv2.VideoCapture(self.url)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        ret, image = self.video.read()
        if not ret:
            self.status = False
            pass
        tmp = cv2.resize(image, self.SIZE)
        tmp = tmp / 255.0
        pred = model.predict(np.array([tmp]))
        string = "Suspicious" if pred[0][0] > self.THRESH else "Peaceful"
        string += f" {str(pred[0][0])}"
        color = (0, 0, 255) if pred[0][0] > self.THRESH else (255, 0, 0)
        image = cv2.putText(image, string, self.org, self.font,
                            self.fontScale, color, self.thickness, cv2.LINE_AA)
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()


def gen(camera):
    while camera.status:
        frame = camera.get_frame()
        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@gzip.gzip_page
def Stream(request):
    try:
        entry = DocModel.objects.all().last()
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


@xframe_options_exempt
def StreamView(request):
    entry = DocModel.objects.all().last()
    return render(request, 'stream.html', {'url': 'http://127.0.0.1:8000'+entry.vid.url})

# API End Point


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
