
# BitHound Election Data Challenge

## Setup

#### General
1. Make sure node and npm is installed on your machine
2. Make sure that mongodb is installed on your machine
3. Grab the code from github

#### Database setup

4. mongoimport the csv found in the csv folder into mongodb
5. set the database variable found in /config/env/development.js to the one you imported the data to

#### Node setup

6. Run npm install to get the correct node modules used
7. Run node server.js to run the application
8. Go to localhost:8080 in a web browser to view the application