FROM node:24.7.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Bundle app source
COPY . .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "src/app.js"]
