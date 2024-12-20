FROM node:latest

EXPOSE 1412
WORKDIR /
COPY package.json /
RUN npm install
COPY . .

CMD [ "npm start" ]