from django.contrib import admin

# Register your models here.
from .models import Location,Home

admin.site.register(Location)
admin.site.register(Home)