from django.db import models
'''
报表系统配置用到的表
'''
# Create your models here.

status_choose = {
    0:'有效',
    1:'无效'
}
class Menu(models.Model):
    title = models.CharField()
    icon = models.CharField()
    pid = models.ForeignKey('self',on_delete=models.CASCADE)   # 父id，内关联，为id
    sort = models.IntegerField(max_length=128)
    url = models.CharField()
    group = models.CharField('二级菜单下的菜单')
    status = models.IntegerField(choices=status_choose)


