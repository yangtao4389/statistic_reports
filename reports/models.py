from django.db import models

# Create your models here.
class DayReports(models.Model):
    d = models.DateField('日期')
    uv = models.IntegerField()
    pv = models.IntegerField()
    game_uv = models.IntegerField()
    game_pv = models.IntegerField()
    count_new_user = models.IntegerField()
    total_user = models.IntegerField()
    total_pay_user = models.IntegerField()
    p_uv = models.IntegerField()
    p_pv = models.IntegerField()
    p_s_uv = models.IntegerField()
    p_s_pv = models.IntegerField()
    p_e_uv = models.IntegerField()
    p_e_pv = models.IntegerField()
    c_percent = models.IntegerField()
    already_pay_user = models.IntegerField()
    p_new_count = models.IntegerField()
    never_pay_user = models.IntegerField()
    p_s_money = models.IntegerField()
    p_e_money = models.IntegerField()
    hall_type = models.CharField(max_length=128)
    serverId = models.IntegerField()
    area_code = models.IntegerField()
    remark = models.CharField(max_length=128)

    class Meta:
        db_table = "rh_month_reports"
        verbose_name_plural = "每日数据统计"

    def __str__(self):
        return "每日数据统计"