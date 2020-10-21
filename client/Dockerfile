FROM node:14-slim as builder

RUN mkdir doodle-chat-ui
WORKDIR /doodle-chat-ui
COPY . ./

RUN yarn install
RUN yarn build

WORKDIR /build

FROM nginx
COPY --from=builder /doodle-chat-ui/build /usr/share/nginx/html