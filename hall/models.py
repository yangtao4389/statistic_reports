from django.db import models
YES_OR_NO = (
    ("T","有效"),
    ("F","无效"),
)

IS_OPEN = (
    (1,"开放"),
    (0,"不开放"),
)
# Create your models here.
class Location(models.Model):
    "首页位置"
    c_key = models.CharField("位置键值", max_length=128, null=False, blank=False, default='', help_text="位置键值(英文)")
    c_name = models.CharField("位置名称", max_length=128, null=False, blank=False, default='', help_text="位置名称(中文)")
    create_date = models.DateTimeField(u"创建时间", null=True, auto_now_add=True, help_text="记录产生时间")
    location_type = models.CharField("位置类型", max_length=20, null=True, blank=True, default=None)
    enable = models.CharField("是否有效", max_length=2, choices=YES_OR_NO, null=False, blank=False, default="T")

    class Meta:
        db_table = "hall_location"
        verbose_name = "位置"

    class Admin:
        list_fields = [
            "id", "c_key", "c_name", "create_date", "enable",
        ]
        init_index = 15


    def __unicode__(self):
        return self.c_name


class Home(models.Model):
    """
    活动列表
    """
    c_key = models.CharField("活动编码", max_length=128, null=False, default='', help_text="活动编码")
    c_name = models.CharField("活动名称", max_length=128, null=False, default='', help_text="活动名称")
    c_url = models.CharField("活动地址", max_length=255, null=False, default='', help_text="活动入口地址", blank=True)
    c_image_url = models.CharField("活动图片", max_length=255, null=False, default='', help_text="活动图片地址", blank=True)
    c_image_url_sed = models.CharField("(选中)活动图片", max_length=255, null=False, default='', help_text="(选中)活动图片地址",
                                    blank=True)
    c_priority = models.IntegerField("优先级", null=False, default=0, help_text="显示的优先级")
    c_is_open = models.SmallIntegerField("是否开放", null=False, choices=IS_OPEN, default=1, help_text="是否显示在活动列表中")
    c_time = models.DateTimeField("时间", null=True, auto_now_add=True, help_text="记录产生时间")
    c_starttime = models.DateTimeField("活动开始时间", null=True, auto_now_add=False, help_text="开始时间")
    c_endtime = models.DateTimeField("活动结束时间", null=True, auto_now_add=False, help_text="结束时间")
    location = models.ForeignKey(Location,on_delete=False)
    enable = models.CharField("是否有效", max_length=2, choices=YES_OR_NO, null=False, blank=False, default="T")


    class Meta:
        db_table = "hall_home"  # 自定义表名，且不会自动加前缀
        verbose_name = "首页表"

    class Admin:
        cache = 300
        list_fields = [
            "id", "c_key", "c_name", "c_url", "c_image_url", "c_image_url_sed", "c_priority", "c_is_open",
            "c_time", "c_starttime", "c_endtime", "c_coin_losetime", "location__id", "location__c_key",
            "location__c_name", "enable",
        ]

    def __unicode__(self):
        return self.c_name