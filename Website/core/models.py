from django.db import models
import os


def content_file_name(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s_%s.%s" % (instance.user.id, instance.questid.id, ext)
    return os.path.join('uploads', filename)


class DocModel(models.Model):
    stoken = models.CharField(max_length=50, unique=False, default='')
    date = models.DateTimeField(auto_now_add=True)
    vid = models.FileField(upload_to='documents/')

    def __str__(self):
        return str(self.date)
