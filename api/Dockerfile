# Uses the node base image with the latest LTS version
FROM registry1.dso.mil/ironbank/opensource/nodejs/debian/nodejs:18.19.1

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app/
USER node 

COPY --chown=node:node server.js /home/node/app/

# Installs npm dependencies on container
RUN npm install
# Informs Docker that the container listens on the 
# specified network ports at runtime
EXPOSE 4000 8085
# Command container will actually run when called
CMD ["node", "server.js"]
