FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node . .

RUN yarn install
RUN yarn run build

USER node

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]