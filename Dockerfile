FROM node:18-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm -y install
COPY . .
RUN npm run build

FROM nginx
RUN useradd -u 1234 frontend
USER frontend
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx
COPY ./default.conf /etc/nginx/conf.d
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 3000

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]

