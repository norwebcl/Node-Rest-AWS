FROM node:14

WORKDIR /microservicio
COPY package.json .
RUN npm install
COPY . .
CMD npm start
