### 正式使用说明
#### 1.conf_docker文件夹里的内容应该与manage.py 同级 
> `mv -f conf_docker/* . `
#### 2.创建docker image
> `docker build -t django_nginx . `
#### 3.修改uwsgi.ini
> 写上相对路径：module= statistic_reports.wsgi:application
#### 4.创建docker container
* 端口映射  -p 8001:80  
* 容器名称 --name dev_statistic_reports  
* 项目文件目录 -v  path_to_your_project_code:/home/code/app  
* 容器nginx日志：/var/log/nginx/  
> `docker run -d -p 8001:80 --name dev_statistic_reports -v /home/code/dev/statistic_reports:/home/code/app -v /home/logs/dev/statistic_reports/docker:/home/logs -v /home/logs/dev/statistic_reports/docker:/var/log/nginx/ django_nginx  `
    

### 容器操作 
以下的7f690c17f771为容器id
* 进入终端页面  
>`docker exec -it 7f690c17f771 /bin/bash`
* 查看supervisorctl 状态
> `docker exec -it 7f690c17f771 supervisorctl status`
* 重启supervisor
> `docker exec -it 7f690c17f771 supervisorctl reload`
* 重启uwsgi
> `docker exec -it 7f690c17f771 supervisorctl restart app-uwsgi`
* 重启nginx
> `docker exec -it 7f690c17f771 supervisorctl restart nginx-app`


### 参考链接
* https://github.com/yangtao4389/django-uwsgi-nginx



 




