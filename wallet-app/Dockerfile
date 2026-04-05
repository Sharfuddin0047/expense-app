# Copy pom.xml and install dependecies and build wallet-app-0.0.1-SNAPSHOT.jar
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
RUN apk add --no-cache curl
WORKDIR /app

# Copy the JAR from the build stage and rename to app.jar
COPY --from=build /app/target/*.jar app.jar

EXPOSE 1011
ENTRYPOINT ["java", "-jar", "app.jar"]