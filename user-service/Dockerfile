FROM node:15.1.0-alpine
WORKDIR /user-service
COPY package.json /user-service
RUN npm install
CMD npm run build && npm run db:setup && npm run start:dev
