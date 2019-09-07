FROM node:10.15.3 as builder

RUN mkdir -p /root/src/app
WORKDIR /root/src/app
ENV PATH /root/src/app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:10.15.3-alpine

WORKDIR /root/src/app

COPY --from=builder /root/src/app/dist /root/src/app/dist
COPY --from=builder /root/src/app/package.json /root/src/app/package.json

EXPOSE 3000

ENTRYPOINT ["npm","run","start"]
