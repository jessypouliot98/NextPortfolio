ARG PORT="${PORT}"

FROM node:16 as next-portfolio

ARG PORT

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY ./ "./"

RUN yarn install
RUN yarn build
EXPOSE "${PORT}"

ENV PORT="${PORT}"
CMD ["yarn", "start", "-p", "${PORT}"]
