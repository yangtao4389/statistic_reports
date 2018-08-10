from django import template
register = template.Library()


def get_value_by_key(d, key_name):
    '''
    模板filter
    根据键值，返回字典的value值
    :param d: 字典
    :param key_name:键值
    :return: value
    '''
    return d[key_name]
get_value_by_key = register.filter('get_value_by_key', get_value_by_key)
# register.filter(get_value_by_key)