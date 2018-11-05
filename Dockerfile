FROM node:alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm i -g pm2 && npm install
COPY . .
EXPOSE 3333 5433
CMD [ "npm", "start" ]
