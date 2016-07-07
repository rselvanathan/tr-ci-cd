FROM node:6.3.0-wheezy

EXPOSE 8080

WORKDIR /app

ADD app /app

RUN [ "npm", "install" ]

CMD [ "node", "index" ]
