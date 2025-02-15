FROM node:23-alpine3.20 AS builder
RUN npm install -g @nestjs/cli

USER node
WORKDIR /home/node
COPY --chown=node:node . .

RUN npm ci
RUN npm run build && npm prune --omit=dev

FROM node:23-alpine3.20
USER node
WORKDIR /home/node
COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules ./node_modules/

COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
EXPOSE 3000

CMD ["node", "dist/main.js"]
