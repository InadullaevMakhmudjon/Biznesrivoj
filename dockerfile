FROM node:13-stretch
RUN mkdir /home/app
WORKDIR /home/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]