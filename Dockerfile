FROM node:18-alpine
COPY ./ ./
RUN npm -y install
EXPOSE 3000
CMD ["npm", "run", "start"]

