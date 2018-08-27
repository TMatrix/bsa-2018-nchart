FROM node:10.8.0

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY ./* $APP_ROOT/
COPY client $APP_ROOT/client
WORKDIR $APP_ROOT/client

RUN npm i -g @angular/cli \
    && npm i -g typescript \
    && npm i -g sequelize sequelize-cli pg \
    && npm i \
    && npm run build-prod

WORKDIR $APP_ROOT/client/dist/client

COPY . $APP_ROOT/client/dist

WORKDIR $APP_ROOT

RUN npm i \
    && npm run seed \
    && npm run migrate

EXPOSE 8080

CMD ["npm", "start"]