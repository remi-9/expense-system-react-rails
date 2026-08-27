FROM node:18-bookworm-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --include=optional \
 && npm install --no-save @rollup/rollup-linux-x64-gnu

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
