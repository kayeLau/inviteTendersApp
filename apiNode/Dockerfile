FROM node:12-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm install -g typescript
RUN npm run build
CMD [ "npm", "run", "prod" ]