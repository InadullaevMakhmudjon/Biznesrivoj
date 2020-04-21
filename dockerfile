FROM node:13-stretch
USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]