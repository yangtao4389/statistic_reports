from django.contrib import admin
from .models import DayReports

# Register your models here.
@admin.register(DayReports)
class DayReportsAdmin(admin.ModelAdmin):
    list_display = ('d','uv','pv','total_pay_user','area_code')

