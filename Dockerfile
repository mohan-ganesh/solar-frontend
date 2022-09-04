FROM node:14.15.4-alpine
WORKDIR /usr/app
COPY . .
RUN npm ci --only=production
RUN npm run build
CMD ["npm","start"]
