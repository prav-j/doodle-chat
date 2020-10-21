FROM gradle:6.7 as builder

RUN mkdir doodle-chat-api
WORKDIR /doodle-chat-api
COPY src ./src
COPY resources ./resources
COPY build.gradle ./build.gradle
COPY gradle.properties ./gradle.properties
RUN gradle build

FROM openjdk:10-jre-slim
RUN mkdir app
COPY --from=builder /doodle-chat-api/build/distributions/doodle-chat-api-0.0.1.tar /app
WORKDIR /app
RUN tar -xvf doodle-chat-api-0.0.1.tar
WORKDIR /app/doodle-chat-api-0.0.1
EXPOSE 8080
CMD bin/doodle-chat-api