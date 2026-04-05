# Copy and install Dependencies as build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy all source code and creates a build
COPY . .
RUN npm run build


# Takes the build folder from build stage and serves it on port 80
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]