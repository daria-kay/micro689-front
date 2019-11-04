FROM node:8
WORKDIR /micro689-client
COPY . ./

RUN npm install
EXPOSE 3000

CMD ["npm", "start"]