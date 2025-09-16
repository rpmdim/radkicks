import uuid
from django.db import models

class Product(models.Model):
    CATEGORY_CHOICES = [
    ('shoes', 'Shoes'),
    ('jerseys', 'Jerseys'),
    ('balls', 'Balls'),
    ('gloves', 'Gloves'),
    ('accessories', 'Accessories'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.TextField()
    thumbnail = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='balls')
    is_featured = models.BooleanField(default=False)
    stock = models.PositiveIntegerField(default=0)
    rating = models.FloatField(default=0.0)
    brand = models.CharField(max_length=35, blank=True, null=True)
    size = models.CharField(max_length=10, blank=True, null=True)
    
    def __str__(self):
        return self.name