import time
def getmodelfield(modelobj):
    '''
    根据模型类获取对应的field与verbose_name
    :param modelobj:
    :return:
    '''
    fielddic={}
    for field in modelobj._meta.fields:
        fielddic[field.name] = field.verbose_name
    return fielddic

def isVaildDate(date):
    '''
    判断日期格式是否符合标准
    :param self:
    :param date:
    :return:
    '''
    try:
        if ":" in date:
            time.strptime(date, "%Y-%m-%d %H:%M:%S")
        else:
            time.strptime(date, "%Y-%m-%d")
        return True
    except:
        return False

def isVaildInt(data):
    try:
        int(data)
        return True
    except:
        return False

# json.dumps用的自定义转码
# class DefaultJsonEncoder(json.JSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, datetime.datetime):
#             return obj.strftime("%Y-%m-%d %H:%M:%S")
#         elif isinstance(obj, datetime.date):
#             return obj.strftime("%Y-%m-%d")
#         elif isinstance(obj, decimal.Decimal):
#             return "%s" % obj
#         elif isinstance(obj, collections.OrderedDict):
#             return dict(obj)
#         return json.JSONEncoder.default(self, obj)