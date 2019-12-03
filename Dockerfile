# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install

ARG configuration=production
RUN npm run build -- --output-path=./dist --configuration $configuration
RUN npm run build --environment=$env

# stage 2do
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html


