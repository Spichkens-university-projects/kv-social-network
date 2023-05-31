FROM node:18

WORKDIR ./app/server

COPY package*.json ./
RUN npm i -g @nestjs/cli
RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main" ]