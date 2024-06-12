FROM node:16-bullseye-slim
WORKDIR /app
COPY . /app
RUN apt-get update && apt-get install -y curl
RUN yarn install --frozen-lockfile
RUN yarn playwright install-deps
RUN yarn playwright install
