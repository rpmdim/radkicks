import uuid
from django.db import models

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField()
    thumbnail = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=20, default='update')
    is_featured = models.BooleanField(default=False)
    stock = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)
    brand = models.CharField(max_length=35, blank=True, null=True)
    size = models.CharField(max_length=10, blank=True, null=True)
    
    def __str__(self):
        return self.name