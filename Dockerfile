# Step 1: Build the React app
FROM node:latest as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the app using NGINX
FROM nginx:alpine

# Change the path from /app/build to /app/dist
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]