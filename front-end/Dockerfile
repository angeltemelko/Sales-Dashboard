#STEP 1 DEVELOP STAGE
FROM node:16-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
WORKDIR /app
COPY . .

#STEP 3 BUILD STAGE
FROM develop-stage as build-stage
RUN npm run build

#STEP 2 PRODUCTION STAGE
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
