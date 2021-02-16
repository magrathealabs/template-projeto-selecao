from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Repo(models.Model):
    id = models.CharField(max_length=255, primary_key = True)
    name = models.CharField(max_length=255)
    description = models.TextField(default="")
    link =  models.CharField(max_length=128)
    user = models.ManyToManyField(User, related_name="repos", blank=False)

    def __str__(self):
        return f"{self.id}: name = {self.name}; description = {self.description}; link = {self.link}"

class Tag(models.Model):
    name = models.CharField(max_length=64)
    repo = models.ManyToManyField(Repo, blank=False, related_name = "tags")
    user =  models.ForeignKey(User, related_name="tags", on_delete=models.CASCADE)

    def __str__(self):
        return  f"{self.name}"
