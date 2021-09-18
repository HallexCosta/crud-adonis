FROM node:16-alpine

WORKDIR /usr/crud-adonis

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start"]
