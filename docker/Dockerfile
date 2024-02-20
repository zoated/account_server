FROM node:12.16.3-alpine

ENV PROJECT_NAME log-services

COPY $PROJECT_NAME.tar.gz ./

RUN tar xzvf $PROJECT_NAME.tar.gz -C ./ && cd $PROJECT_NAME

CMD cd $PROJECT_NAME && npm run start
