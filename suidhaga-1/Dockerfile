FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV NEXT_PUBLIC_GRAPHQL_URL=http://backend:4000/graphql
CMD [ "npm","run","dev"]

