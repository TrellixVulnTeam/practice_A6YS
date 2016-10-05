import datetime

from django.db import models
from django.utils import timezone

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __str__(self):
    	return self.question_text
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text


class Make(models.Model):
    make_name = models.CharField(max_length=30)
    pub_date = models.DateTimeField('date published')
    def __str__(self): 
        return self.make_name
    # Make.admin_order_field = 'make'

class Model(models.Model):
    make_name = models.ForeignKey(Make, on_delete=models.CASCADE)
    model_name = models.CharField(max_length=50)
    pub_date = models.DateTimeField('date published', default=timezone.now())
    def __str__(self):
        return self.model_name