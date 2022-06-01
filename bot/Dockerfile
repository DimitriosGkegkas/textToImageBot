FROM --platform=linux/amd64  node:14

WORKDIR /bot

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn

COPY . ./
RUN yarn run build
CMD ["npm","start"]  