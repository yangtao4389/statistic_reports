# -*- coding: utf-8 -*-
import time
import datetime

# from django.utils.log import getLogger

# logger = getLogger("default")


class UIDMaker:
    """
    uid生成器
    """

    def __init__(self, prefix=""):
        """
        @parame prefix: uid前缀字符串
        """
        self.prefix = prefix
        self.prepStr = prefix + "%s" + "%05u" % os.getpid() + "%05u"
        self.noPrefixStr = "%s" + "%05u" % os.getpid() + "%05u"
        self._auto_id = 0  # 局计数，0xFFFF一轮回

    def make(self, matchStr):
        """
        make new id
        """
        t = time.time()
        st = time.strftime("%Y%m%d%H%M%S",
                           time.localtime(t)) + "%03d" % int(t * 1000 % 1000)
        self._auto_id = self._auto_id % 0xFFFF + 1
        return matchStr % (st, self._auto_id)

    def __call__(self):
        """
        @return: string
        201101010000001111100000
        """
        return self.make(self.prepStr)

    def asNoPrefix(self):
        """
        输出没有 prefix 的uid
        """
        return self.make(self.noPrefixStr)


class UIDMaker_DateTime:
    """
    uid生成器
    """

    def __init__(self, prefix=""):
        """
        @parame prefix: uid前缀字符串
        """
        self.prefix = prefix

    def __call__(self):
        """
        @return: string
        """
        return self.prefix + self.asNoPrefix()

    def asNoPrefix(self):
        """
        输出没有 prefix 的uid
        1325815959781
        """
        return datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")


class UIDMaker_TimeOnly:
    """
    uid生成器
    """

    def __init__(self, prefix=""):
        """
        @parame prefix: uid前缀字符串
        """
        self.prefix = prefix

    def __call__(self):
        """
        @return: string
        """
        return self.prefix + self.asNoPrefix()

    def asNoPrefix(self):
        """
        输出没有 prefix 的uid
        1325815959781
        """
        return str(long(time.time() * 1000))


def encodeOriginalInfo(key, valueStr):
    """
加密字符串 encodeOriginalInfo('0:2','guocs5') -> '3uaqsi'
"""
    if key is None or valueStr is None:
        return None
    if ":" not in key:
        return None
    keys = key.split(":")
    # 在这里请注意将keys[0]、keys[1]转换为int型
    keys = [int(keys[0]), int(keys[1])]

    use = list(valueStr)
    # 先调整体错位
    m1 = use[keys[0]:]
    m2 = use[:keys[0]]

    # 再部份字符反序
    s = 0
    e = len(m1) - 1
    while s < e:
        m1[s], m1[e] = m1[e], m1[s]
        s += 1
        e -= 1

    use = m1 + m2
    for i in range(len(use)):
        if (i + 1) % 2 == 1:
            use[i] = chr(ord(use[i]) - keys[1])
        else:
            use[i] = chr(ord(use[i]) + keys[1])
    return "".join(use) #20180813


def getOriginalInfo(key, user_message):
    """
    解密userid
    getOriginalInfo("0:2","3uaqsi") -> "guocs5"
    """
    if key is None or user_message is None: return None
    if ":" not in key: return None
    keys = key.split(":")
    print(keys)
    # 在这里请注意将keys[0]、keys[1]转换为int型
    keys = [int(keys[0]), int(keys[1])]

    use = list(user_message)
    for i in range(len(use)):
        if (i + 1) % 2 == 1:
            use[i] = chr(ord(use[i]) + keys[1])
        else:
            use[i] = chr(ord(use[i]) - keys[1])
    result = "".join(use)

    m1 = result[:len(result) - keys[0]]
    m2 = result[len(result) - keys[0]:]

    s = 0
    e = len(m1) - 1

    us = list(m1)

    while s < e:
        us[s], us[e] = us[e], us[s]
        s += 1
        e -= 1

    # return m2 + "".join(us)
    return m2 + "".join(us)  #20180813改变编码


# str1 = 'osNiC7`MK｛oE5fPDGV@CT53QqE47MuA8'
# key = '4:2'
# a = getOriginalInfo(key,str1)
# print a
# # print ord(str1[0])
# # print chr(49)
# #
# for i in range(0,255):
#     print chr(i),
# print chr(255)
# print type(chr(239))
