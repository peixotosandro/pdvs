FROM node:12

WORKDIR /usr/app

COPY . ./

RUN yarn

EXPOSE 9000

CMD [ "yarn", "start" ]
