#sudo docker pull 168.70.160.165:8888/node:latest

#sudo docker build -t 168.70.160.165:9999/cv-server .

#sudo docker tag 168.70.160.165:9999/cv-server  168.70.160.165:9999/cv-server:$1

#sudo docker push 168.70.160.165:9999/cv-server


sudo docker build -t cv-server .

sudo docker run -it --name cv-server -p 8080:8080 -e PORT=8080 -e DBHOST=xxx.xxx.xxx.xxx -e DBUSER=dbuser -e DBPWD=xxxxxx -e DBDATABASE=dbname -e LOGSTASHURL=xxx.xxx.xxx.xxx cv-server


