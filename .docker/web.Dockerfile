ARG APP_PORT="${APP_PORT}"

FROM node:16.17.0-buster-slim as next-portfolio

# Setup app
ARG APP_PORT

RUN mkdir -p /usr/app/
WORKDIR /usr/app

# If there's no changes here, the yarn install can use cache and optimize this Dockerfile build speed
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .

RUN npx prisma generate
RUN yarn build

EXPOSE ${APP_PORT}

# Run app
CMD ["yarn", "start"]
