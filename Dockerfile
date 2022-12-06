FROM node:18-alpine
COPY ./ ./
RUN npm -y install \
&& npm cache clear --force
EXPOSE 3000
CMD ["npm", "run", "start"]

