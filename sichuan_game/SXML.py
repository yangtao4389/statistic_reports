# -*- coding: utf8 -*-
"""
一个 xml 配置的工具。
"""

from xml import sax
from xml.sax.handler import ContentHandler
from xml.sax.xmlreader import AttributesImpl


class XMLNode(object):
    """
    XMLNode节点
    """

    def __init__(self, name="", parentNode=None):
        self.name = name
        self._value = ""
        self._parentNode = parentNode
        self._childNodeName = []
        self._childNodeValue = []
        self.attrs = {}
        # 指向原始的打开文件
        self.filename = None

    def __str__(self):
        return self._format2str()

    def _format2str(self, prefix=""):
        """
        format all XMLNode to string
        """
        strData = [e._format2str("\t" + prefix) for e in self._childNodeValue]
        attrsStr = " ".join(
            ["%s='%s'" % (k, v) for k, v in self.attrs.items()])
        valData = ""
        if len(attrsStr) > 0:
            heads = "<%s %s>" % (self.name, attrsStr)
        else:
            heads = "<%s>" % self.name
        if len(self._value) > 0:
            if len(self._childNodeValue) == 0:
                spv = self._value.split("\n")
                if len(spv) == 1:
                    strB = prefix + heads
                    strE = "</%s>\n" % (self.name)
                    valData = self._value
                else:
                    strB = prefix + heads + "\n"
                    strE = "%s</%s>\n" % (prefix, self.name)
                    valList = []
                    for e in spv:
                        valList.append("\t%s%s\n" % (prefix, e))
                    valData = "".join(valList)
            else:
                strB = prefix + heads + "\n"
                strE = "%s</%s>\n" % (prefix, self.name)
                valList = []
                for e in self._value.split("\n"):
                    valList.append("\t%s%s\n" % (prefix, e))
                valData = "".join(valList)
        else:
            if len(self._childNodeValue) == 0:
                strB = prefix + heads
                strE = "</%s>\n" % (self.name)
            else:
                strB = prefix + heads + "\n"
                strE = "%s</%s>\n" % (prefix, self.name)
        strData.insert(0, strB)
        strData.insert(1, valData)
        strData.append(strE)
        vd = "".join(strData)
        return vd

    def _addNode(self, name):
        """
        @param name: instance of XMLNode
        @type  name: XMLNode
        @return:     instance of XMLNode
        @rtype:      XMLNode
        """
        assert isinstance(name, str), "it's no str type."
        self._childNodeName.append(name)
        self._childNodeValue.append(XMLNode(name, self))
        return self._childNodeValue[-1]

    def _getNode(self, path, create=False):
        """
        @param create: if node not found then create it
        @type  create: bool
        @return: XMLNode or None
        @rtype:  XMLNode/None
        """
        p = path.split("/")
        sec = self
        for e in p:
            try:
                i = sec._childNodeName.index(e)
            except ValueError:
                if not create:
                    return None
                sec = sec._addNode(e)
            else:
                sec = sec._childNodeValue[i]
        return sec

    def _getNodes(self, path):
        p = path.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0])
            n = p[1]

        nodes = []
        if sec is None:
            return nodes

        pos = 0
        while 1:
            try:
                i = sec._childNodeName.index(n, pos)
                pos = i + 1
            except ValueError:
                return nodes
            nodes.append(sec._childNodeValue[i])

    def child(self, index):
        """
        @return: instance of XMLNode
        @rtype:  XMLNode
        """
        return self._childNodeValue[index]

    def childName(self, index):
        """
        @return: name of child
        @rtype:  string
        """
        return self._childNodeName[index]

    def copy(self, source):
        """
        from source copy into me;
        all copy is reference, no real copy;
        @param source: instance of XMLNode
        @type  source: XMLNode
        """
        self._value = source._value
        for e in source._childNodeValue:
            self.createNode(e.name).copy(e)

    def createNode(self, path):
        """
        @param path: string as "abc/def/node1"
        @type  path: string
        @return:            instance of XMLNode
        @rtype:             XMLNode
        """
        p = path.rsplit("/", 1)

        # if len(p) == 1:
        #     sec = self
        #     n = p
        # else:
        #     sec = self._getNode(p[0], True)
        #     n = p[1]

        return self._addNode(path)

    def deleteNode(self, name):
        """
        @return: True or False
        @rtype:  bool
        """
        p = name.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0])
            n = p[1]

        if sec is None:
            return False

        try:
            i = sec._childNodeName.index(n)
        except ValueError:
            return False

        del sec._childNodeName[i]
        del sec._childNodeValue[i]
        return True

    def has_key(self, key):
        return key in self._childNodeName

    def items(self):
        return zip(self._childNodeName, self._childNodeValue)

    def keys(self):
        return list(self._childNodeName)

    def values(self):
        return list(self._childNodeValue)

    def __getitem__(self, name):
        return self._getNode(name)

    def save(self, filename=None):
        """
        """
        assert filename is not None or self.filename is not None
        if filename is None:
            filename = self.filename
        saveTo(filename, self)

    ###############################################
    # _as method                                  #
    ###############################################
    def _asBinary(self):
        return self._format2str()

    def _asBool(self):
        if self._value.isdigit():
            return bool(int(self._value))
        else:
            return self._value in ("True", "true")

    def _asFloat(self):
        try:
            return float(self._value)
        except:
            return 0.0

    def _asInt(self):
        try:
            return int(self._value)
        except:
            return 0

    def _asInt64(self):
        try:
            return long(self._value)
        except:
            return long(0)

    def _asMatrix(self):
        raise "sorry, I don't support this function."

    def _asString(self):
        return self._value

    def _asVector2(self):
        try:
            return tuple([float(e) for e in self._value.split(" ")][0:2])
        except:
            return (0.0, 0.0)

    def _asVector3(self):
        try:
            return tuple([float(e) for e in self._value.split(" ")][0:3])
        except:
            return (0.0, 0.0, 0.0)

    def _asVector4(self):
        try:
            return tuple([float(e) for e in self._value.split(" ")][0:4])
        except:
            return (0.0, 0.0, 0.0, 0.0)

    def _asWideString(self):
        raise "sorry, I don't support this function."

    ###############################################
    # _to method                                  #
    ###############################################
    def _toBinary(self, value):
        raise "sorry, I don't support this function."

    def _toBool(self, value):
        if bool(value):
            self._value = "true"
        else:
            self._value = "false"

    def _toFloat(self, value):
        self._value = str(float(value))

    def _toInt(self, value):
        self._value = str(int(value))

    def _toInt64(self, value):
        self._value = str(long(value))

    def _toMatrix(self, value):
        raise "sorry, I don't support this function."

    def _toString(self, value):
        self._value = str(value)

    def _toVector2(self, value):
        assert isinstance(value, tuple) or isinstance(value, list)
        assert len(value) == 2
        self._value = "".join((str(float(value[0])), " ",
                               str(float(value[1]))))

    def _toVector3(self, value):
        assert isinstance(value, tuple) or isinstance(value, list)
        assert len(value) == 3
        self._value = "".join((str(float(value[0])), " ", str(float(value[1])),
                               " ", str(float(value[2]))))

    def _toVector4(self, value):
        assert isinstance(value, tuple) or isinstance(value, list)
        assert len(value) == 4
        self._value = "".join((str(float(value[0])), " ", str(float(value[1])),
                               " ", str(float(value[2])), " ",
                               str(float(value[3]))))

    def _toWideString(self, value):
        raise "sorry, I don't support this function."

    ###############################################
    # property                                    #
    ###############################################
    asBinary = property(_asBinary, _toBinary, None, "I'm property.")
    asBool = property(_asBool, _toBool, None, "I'm property.")
    asFloat = property(_asFloat, _toFloat, None, "I'm property.")
    asInt = property(_asInt, _toInt, None, "I'm property.")
    asInt64 = property(_asInt64, _toInt64, None, "I'm property.")
    asMatrix = property(_asMatrix, _toMatrix, None, "I'm property.")
    asString = property(_asString, _toString, None, "I'm property.")
    asVector2 = property(_asVector3, _toVector2, None, "I'm property.")
    asVector3 = property(_asVector3, _toVector3, None, "I'm property.")
    asVector4 = property(_asVector4, _toVector4, None, "I'm property.")
    asWideString = property(_asWideString, _toWideString, None,
                            "I'm property.")

    ###############################################
    # read method                                 #
    ###############################################
    def readBool(self, name):
        try:
            return self._getNode(name)._asBool()
        except:
            return False

    def readFloat(self, name):
        try:
            return self._getNode(name)._asFloat()
        except:
            return 0.0

    def readFloats(self, name):
        try:
            return [e._asFloat() for e in self._getNodes(name)]
        except:
            return []

    def readInt(self, name):
        try:
            return self._getNode(name)._asInt()
        except:
            return 0

    def readInts(self, name):
        try:
            return [e._asInt() for e in self._getNodes(name)]
        except:
            return []

    def readInt64(self, name):
        try:
            return self._getNode(name)._asInt64()
        except:
            return ""

    def readMatrix(self, name):
        return self._getNode(name)._asMatrix()

    def readString(self, name):
        try:
            return self._getNode(name)._asString()
        except:
            return ""

    def readStrings(self, name):
        try:
            return [e._asString() for e in self._getNodes(name)]
        except:
            return []

    def readVector2(self, name):
        try:
            return self._getNode(name)._asVector2()
        except:
            return (0.0, 0.0)

    def readVector2s(self, name):
        try:
            return [e._asVector2() for e in self._getNodes(name)]
        except:
            return []

    def readVector3(self, name):
        try:
            return self._getNode(name)._asVector3()
        except:
            return (0.0, 0.0, 0.0)

    def readVector3s(self, name):
        try:
            return [e._asVector3() for e in self._getNodes(name)]
        except:
            return []

    def readVector4(self, name):
        try:
            return self._getNode(name)._asVector4()
        except:
            return (0.0, 0.0, 0.0, 0.0)

    def readVector4s(self, name):
        try:
            return [e._asVector4() for e in self._getNodes(name)]
        except:
            return []

    def readWideString(self, name):
        return self._getNode(name)._asWideString()

    def readWideStrings(self, name):
        return [e._asWideString() for e in self._getNodes(name)]

    ###############################################
    # write method                                #
    # return: XMLNode                       #
    ###############################################
    def write(self, name, value):
        sec = self._getNode(name, True)
        sec._value = str(value)
        return sec

    def writeBool(self, name, value):
        sec = self._getNode(name, True)
        sec._toBool(value)
        return sec

    def writeFloat(self, name, value):
        sec = self._getNode(name, True)
        sec._toFloat(value)
        return sec

    def writeFloats(self, name, values):
        assert isinstance(values, tuple) or isinstance(values, list)
        p = name.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0], True)
            n = p[1]

        for e in values:
            sec.createNode(n)._toFloat(e)

    def writeInt(self, name, value):
        sec = self._getNode(name, True)
        sec._toInt(value)
        return sec

    def writeInts(self, name, values):
        assert isinstance(values, tuple) or isinstance(values, list)
        p = name.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0], True)
            n = p[1]

        for e in values:
            sec.createNode(n)._toInt(e)

    def writeInt64(self, name, value):
        sec = self._getNode(name, True)
        sec._toInt64(value)
        return sec

    def writeMatrix(self, name, value):
        sec = self._getNode(name, True)
        sec._toMatrix(value)
        return sec

    def writeString(self, name, value):
        sec = self._getNode(name, True)
        sec._toString(value)
        return sec

    def writeStrings(self, name, values):
        assert isinstance(values, tuple) or isinstance(values, list)
        p = name.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0], True)
            n = p[1]

        for e in values:
            sec.createNode(n)._toString(e)

    def writeVector2(self, name, value):
        sec = self._getNode(name, True)
        sec._toVector2(value)
        return sec

    def writeVector2s(self, name, values):
        assert isinstance(values, tuple) or isinstance(values, list)
        p = name.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0], True)
            n = p[1]

        for e in values:
            sec.createNode(n)._toVector2(e)

    def writeVector3(self, name, value):
        sec = self._getNode(name, True)
        sec._toVector3(value)
        return sec

    def writeVector3s(self, name, values):
        assert isinstance(values, tuple) or isinstance(values, list)
        p = name.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0], True)
            n = p[1]

        for e in values:
            sec.createNode(n)._toVector3(e)

    def writeVector4(self, name, value):
        sec = self._getNode(name, True)
        sec._toVector4(value)
        return sec

    def writeVector4s(self, name, values):
        assert isinstance(values, tuple) or isinstance(values, list)
        p = name.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0], True)
            n = p[1]

        for e in values:
            sec.createNode(n)._toVector4(e)

    def writeWideString(self, name, value):
        sec = self._getNode(name, True)
        sec._toWideString(value)
        return sec

    def writeWideStrings(self, name, values):
        assert isinstance(values, tuple) or isinstance(values, list)
        p = name.rsplit("/", 1)

        if len(p) == 1:
            sec = self
            n = p[0]
        else:
            sec = self._getNode(p[0], True)
            n = p[1]

        for e in values:
            sec.createNode(n)._toWideString(e)


# end of class: XMLNode


class SimpleXMLHandler(ContentHandler):
    """
    SimpleXMLHandler
    """
    default_char_code = "gb18030"

    def __init__(self):
        """
        __init__
        """
        ContentHandler.__init__(self)

        self._t_nodes = []
        self._t_parent_node = None
        self.rootNode = None

    # def startDocument(self):
    #     print "parse starting..."
    #
    # def endDocument(self):
    #     print "parse over."

    def startElement(self, name, attrs):
        # print "startElement", name, type( attrs ), attrs
        # creating new node
        if len(self._t_nodes) == 0:
            node = XMLNode(str(name))
            self.rootNode = node
        else:
            node = self._t_nodes[-1].createNode(str(name))
        self._t_nodes.append(node)

        # process attrs
        for key in attrs.getNames():
            value = attrs.getValue(key)
            # print "--------> %s'%s':%s'%s'" % (type(key),key,type(value),value )
            node.attrs[key.encode(self.default_char_code)] = value.encode(
                self.default_char_code)

    def endElement(self, name):
        # print "endElement", name
        if len(self._t_nodes) > 0:
            node = self._t_nodes.pop()
        if len(node._value) > 0:
            node._value = node._value.strip(" \n\r\t")
        if node.name != str(name):
            raise "element not match. element name = '%s', param name = '%s'" % (
                node.name, name)

    def characters(self, content):
        # print "characters", content
        date = content.encode(self.default_char_code)
        data = date.strip(" \t")
        if len(data) == 0: 
            return

        try:
            node = self._t_nodes[-1]
        except:
            raise "xml file not right."
        if len(node._value) == 0:
            node._value = str(data)
        else:
            node._value = node._value + data
        return


# end of class: SimpleXMLHandler


class pyXmlParser:
    """
    自己定制的非xml标准的xml文件解析器。
    在不需要效率的环境下，可以使用此解释器做对一些非标准的xml进行解析。
    注意：这是一个没有attr的解析版本，即本解析器不会分析附加属性，且如果有了附加属性，就有可能会出错。
    """
    PARSER_STATE_CHARACTER_DATA = 0x0001  # <xxx> ... </xxx>
    PARSER_STATE_START_ELEMENT = 0x0002  # <xxx>
    PARSER_STATE_END_ELEMENT = 0x0003  # </xxx>
    PARSER_STATE_COMMENT = 0x0004  # <!-- ... -->
    PARSER_STATE_XML_HEAD = 0x0005  # <? ... ?>
    PARSER_STATE_OTHER = 0x0006  # <! ... >

    def __init__(self):
        pass

    def parseFile(self, filename, handler):
        f = open(filename, "rt")
        self.parseString(f.read(), handler)
        f.close()

    def parseString(self, srcStr, handler):
        state = self.PARSER_STATE_CHARACTER_DATA
        # print "state =", state
        strData = ""
        handler.startDocument()
        # print "parser string:", srcStr
        col = 0
        strlen = len(srcStr)
        while col < strlen:  # 遍历每一个字符
            c = srcStr[col]
            # print "c =", c
            if state == self.PARSER_STATE_CHARACTER_DATA:  # <xxx> ... </xxx>
                if c == "<":
                    if len(strData) > 0:
                        handler.characters(strData)
                        strData = ""

                    if srcStr[col + 1] == "/":  # </
                        state = self.PARSER_STATE_END_ELEMENT
                        col += 1
                        # print "state =", state
                    elif srcStr[col + 1] == "?":  # <?
                        state = self.PARSER_STATE_XML_HEAD
                        col += 1
                        # print "state =", state
                    elif srcStr[col + 1] == "!":
                        if srcStr[col + 2] == "-" and srcStr[col +
                                                             3] == "-":  # <!--
                            state = self.PARSER_STATE_COMMENT
                            col += 3
                            # print "state =", state
                        else:
                            state = self.PARSER_STATE_OTHER
                            col += 1
                            # print "state =", state
                    else:
                        state = self.PARSER_STATE_START_ELEMENT
                        # print "state =", state
                elif c == ">":
                    raise "I can't pase this line: %s" % srcStr
                else:
                    strData += c
            elif state == self.PARSER_STATE_START_ELEMENT:  # <xxx>
                if c == "/" and srcStr[col + 1] == ">":  # />
                    handler.startElement(strData, AttributesImpl({}))
                    handler.endElement(strData)
                    state = self.PARSER_STATE_CHARACTER_DATA
                    strData = ""
                    col += 1
                    # print "state =", state
                elif c == ">":  # >
                    handler.startElement(strData, AttributesImpl({}))
                    state = self.PARSER_STATE_CHARACTER_DATA
                    strData = ""
                    # print "state =", state
                elif c in ["\r\n"]:  # ignore chars
                    pass
                elif c.isalnum() or c == "_" or c == ".":
                    strData += c
                else:
                    raise "I can't pase this line: %s" % srcStr
            elif state == self.PARSER_STATE_END_ELEMENT:  # </xxx>
                if c == ">":
                    handler.endElement(strData)
                    state = self.PARSER_STATE_CHARACTER_DATA
                    strData = ""
                    # print "state =", state
                elif c.isalnum() or c == "_" or c == ".":
                    strData += c
                else:
                    raise "I can't pase this line: %s" % srcStr
            elif state == self.PARSER_STATE_COMMENT:  # <!-- ... -->
                if c == ">" and col >= 2 and srcStr[col -
                                                    1] == "-" and srcStr[col -
                                                                         2] == "-":
                    state = self.PARSER_STATE_CHARACTER_DATA
                    # print "state =", state
            elif state == self.PARSER_STATE_XML_HEAD:  # <? ... ?>
                if c == ">" and col >= 1 and srcStr[col - 1] == "?":
                    state = self.PARSER_STATE_CHARACTER_DATA
                    # print "state =", state
            elif state == self.PARSER_STATE_OTHER:  # <! ... >
                if c == ">":
                    state = self.PARSER_STATE_CHARACTER_DATA
                    # print "state =", state
            else:
                pass
            # 最后字符位置 +1
            col += 1
        # end while
        handler.endDocument()
        return  # the end


def parse(filename, parser=None):
    """
    open *.xml file to XMLNode
    @return: XMLNode
    """
    p = SimpleXMLHandler()
    if parser:
        dstParser = parser().parseFile
    else:
        dstParser = sax.parse
    dstParser(filename, p)
    root = p.rootNode
    root.filename = filename
    return root


def parseString(string, parser=None):
    """
    parse xml string file to XMLNode
    @return: XMLNode
    """
    p = SimpleXMLHandler()
    if parser:
        dstParser = parser().parseString
    else:
        dstParser = sax.parseString
    dstParser(string, p)
    root = p.rootNode
    root.filename = None
    return root


def saveTo(filename, source):
    """
    save instance of XMLNode to file.
    @param filename: xml file name and path
    @type  filename: string
    @param   source: instance of XMLNode
    @type    source: XMLNode
    @return: no
    """
    f = open(filename, "w")
    f.write(str(source))
    f.close()
    return
