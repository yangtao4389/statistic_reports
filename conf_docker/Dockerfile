# Copyright 2013 Thatcher Peskens
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM ubuntu:16.04

MAINTAINER yangtao

# Install required packages and remove the apt packages cache when done.
# add (the rest of) our code、
# 改成国内镜像
#RUN  cp /etc/apt/sources.list /etc/apt/sources.list.bak
#COPY sources.list  /etc/apt/
#RUN sed -i s/archive.ubuntu.com/mirrors.aliyun.com/g /etc/apt/sources.list



RUN apt-get update && \
    apt-get upgrade -y
RUN apt-get install -y \
	git \
	python3 \
	python3-dev \
	python3-setuptools \
	python3-pip \
	nginx \
	supervisor \
	sqlite3 \
	vim\
	net-tools\
	curl\
	locales\
	tzdata


RUN mkdir /root/.pip
COPY pip.conf /root/.pip/


RUN pip3 install -U pip setuptools

# install uwsgi now because it takes a little while

RUN pip3 install uwsgi

# setup all the configfiles
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY nginx-app.conf /etc/nginx/sites-available/default
COPY supervisor-app.conf /etc/supervisor/conf.d/

# COPY requirements.txt and RUN pip install BEFORE adding the rest of your code, this will cause Docker's caching mechanism
# to prevent re-installing (all your) dependencies when you made a change a line or two in your app.

COPY requirements.txt /home/conf/
RUN pip3 install -r /home/conf/requirements.txt


# 实现时区支持
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN dpkg-reconfigure --frontend noninteractive tzdata


#实现中文支持
RUN locale-gen zh_CN.UTF-8 &&\
  DEBIAN_FRONTEND=noninteractive dpkg-reconfigure locales
ENV LANG zh_CN.UTF-8
ENV LANGUAGE zh_CN:zh
ENV LC_ALL zh_CN.UTF-8



# 不要copy，做目录映射
#COPY . /home/docker/code/



# 进入目录
WORKDIR /home/
# 建立文件共享 运行容器的时候再说
#VOLUME /home/statistic /home/docker/code/



# install django, normally you would remove this step because your project would already
# be installed in the code/app/ directory
#RUN django-admin.py startproject website /home/docker/code/app/


EXPOSE 80
CMD ["supervisord", "-n"]
