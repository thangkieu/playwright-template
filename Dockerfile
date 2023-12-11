# Get the latest version of Playwright
ARG PLAYWRIGHT_IMAGE_URL=mcr.microsoft.com/playwright
ARG PLAYWRIGHT_IMAGE_VERSION=v1.39.0-jammy

FROM $PLAYWRIGHT_IMAGE_URL:$PLAYWRIGHT_IMAGE_VERSION

# Set the work directory for the application
WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

# COPY the needed files to the app folder in Docker image
COPY . .

# Install the dependencies in Node environment
RUN npm install

CMD [ "npm", "test" ]