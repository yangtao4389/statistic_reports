from utils import encodeOriginalInfo,getOriginalInfo
userid = 'TVGB76590:4PA34'  #NC166827749@ITV
key = '4:2'
r = getOriginalInfo(key,userid)
print(r)

q = encodeOriginalInfo(key,r)
print(q)

usertoken = '372765.8/LMno｛ppNE>GpP1HbP64xTkj'  #zRmh28NdF3NrE@CPnrｙqlOJ160385455
r = getOriginalInfo(key,usertoken)
print(r)

q = encodeOriginalInfo(key,r)
print(q)

userid = '0XRK>958.465164553'  #0283346371677@ITV2
key = '10:2'
r = getOriginalInfo(key,userid)
print(r)

usertoken = 'osNiC7`MK｛oE5fPDGV@CT53QqE47MuA8'  #
key = '10:2'
r = getOriginalInfo(key,usertoken)
print(r)  #5OsC65OsC63VABTIBRd7CqｙMKb5EgPqq
g = encodeOriginalInfo("17:2",r)  #osNiC7`MK｛oE5fP7MuA83QqE45TC@VGD
print(g)

userid = '020:152819/859>KRX'  #0283346371677@ITV2
key = '17:2'
r = getOriginalInfo(key,userid)
print(r)
# usertoken = 'osNiC7`MKsA9bT3QqE47MuA81X?DRK@'  #
usertoken = 'osNiC7`MK｛oE5fPDGV@CT53QqE47MuA8'  #
key = '17:2'
r = getOriginalInfo(key,usertoken)
print(r)  #5OsC65OsC63VABTIBRd7CqｙMKb5EgPqq
          #5OsC65OsC63VABTIBRd7CqMKb5EgPqq