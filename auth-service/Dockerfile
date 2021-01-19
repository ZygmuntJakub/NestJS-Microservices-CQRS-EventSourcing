FROM node:15.1.0-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN ls
CMD ["node", "dist/main"]