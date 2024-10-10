
# Image du client React
FROM node:21-slim AS client

WORKDIR /app

COPY . /app
 
#RUN npm update
RUN npm install
 
EXPOSE 3000
 
CMD [ "npm", "start" ]