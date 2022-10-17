ARG PORT="${PORT}"

FROM node:16.17.0-buster-slim as next-portfolio

# Puppeteer Dependency
RUN apt-get update -y
RUN apt-get install -yyq ca-certificates
RUN apt-get install -yyq libappindicator1 libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 libgbm-dev
RUN apt-get install -yyq gconf-service lsb-release wget

# Setup app
ARG PORT
RUN mkdir -p /usr/app/
WORKDIR /usr/app
COPY "./" "./"
VOLUME "./.env" "./.env"
RUN yarn install
RUN npx prisma generate
# RUN npx prisma migrate deploy
RUN yarn build
EXPOSE "${PORT}"

# Run app
ENV PORT="${PORT}"
CMD ["yarn", "start", "-p", "${PORT}"]
