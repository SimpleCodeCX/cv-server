FROM node:10

MAINTAINER "Simple" "248200851@qq.com"

ADD . /cv-server

WORKDIR /cv-server

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

#RUN npm config set registry http://168.70.160.165:8082/repository/simplenpm/

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "prod"]

