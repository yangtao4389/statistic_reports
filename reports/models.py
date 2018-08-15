from django.db import models

# Create your models here.
class DayReports(models.Model):
    d = models.DateField('日期')
    uv = models.IntegerField('UV')
    pv = models.IntegerField('PV')
    game_uv = models.IntegerField()
    game_pv = models.IntegerField()
    count_new_user = models.IntegerField()
    total_user = models.IntegerField()
    total_pay_user = models.IntegerField()
    p_uv = models.IntegerField()
    p_pv = models.IntegerField()
    p_s_uv = models.IntegerField('成功订购用户数')
    p_s_pv = models.IntegerField()
    p_e_uv = models.IntegerField()
    p_e_pv = models.IntegerField()
    c_percent = models.IntegerField("转化率")
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

status_choose = (
    (1,'有效'),
    (0,'无效')
)
# blank 参数是admin后台不用一定写入的参数
class Menu(models.Model):
    title = models.CharField(max_length=128)
    icon = models.CharField(max_length=128,null=True,blank=True)
    pid = models.ForeignKey('self', on_delete=models.CASCADE,null=True,blank=True)  # 父id，内关联，为id
    sort = models.IntegerField(default=0)
    url = models.CharField(max_length=128,null=True,blank=True)
    group = models.CharField('二级菜单下的菜单',max_length=128,null=True,blank=True)
    status = models.IntegerField(choices=status_choose,default=1)

    class Meta:
        db_table = "reports_system_menu"
        verbose_name_plural = "报表系统菜单"

    def __str__(self):
        return self.title


class CanOrderInfo(models.Model):
    c_userid = models.CharField('用户id',max_length=128, null=False,unique=True)
    product_id = models.CharField(max_length=128,null=True)
    order_url = models.CharField(max_length=1280, null=False, default='')
    add_time = models.DateTimeField('用户发起订购时间',null=True)
    is_order = models.CharField('订购结果',max_length=2, null=False, default='F',help_text='F:未去订购，Y：已订购，E：订购失败')
    order_time = models.DateTimeField('自订购时间',null=True)
    remark =  models.CharField('自订购返回信息',max_length=128, null=True, )
    class Meta:
        db_table = "rh_can_order_info"
        verbose_name_plural = "可订购信息"