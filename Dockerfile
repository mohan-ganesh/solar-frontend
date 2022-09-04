FROM node:14.15.4-alpine
WORKDIR /usr/app
COPY . .
ENV API_KEY=$build_profile
ENV NEXT_PUBLIC_API_KEY=$_NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_STRAPI_API_URL=$NEXT_PUBLIC_STRAPI_API_URL
RUN npm ci --only=production
RUN npm run build
CMD ["npm","start"]
