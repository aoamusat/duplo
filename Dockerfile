FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/duplo

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variables
ENV PG_USERNAME=$PG_USERNAME \
    PG_PASSWORD=$PG_PASSWORD \
    PG_DATABASE=$PG_DATABASE \
    PG_HOST=$PG_HOST \
    PG_PORT=$PG_PORT \
    MONGO_URI=$MONGO_URI \
    PORT=$PORT \
    MONGO_USER=$MONGO_USER \
    MONGO_PASSWORD=$MONGO_PASSWORD \
    MONGO_DBNAME=$MONGO_DBNAME \
    ENV_PROFILE=$ENV_PROFILE

# Run database migrations
RUN npx sequelize db:migrate

# Expose the port that the app will run on
EXPOSE $PORT

# Define the command to run your application
CMD ["npm", "start"]
