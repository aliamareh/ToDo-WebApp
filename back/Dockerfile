# Image de l'API
FROM amazoncorretto:18-alpine-jdk as server
RUN apk add --update maven

WORKDIR /app
COPY ./ /app

RUN mvn clean install -Dmaven.test.skip=true && mvn package -Dmaven.test.skip=true 

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app/target/back-1.0.0.jar"]
