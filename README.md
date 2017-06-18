# express-kit-starter
Node.js + ExpressJS + MongooseJS + BabelJS + JWT + ES2015 + Mocha + Chai + Clustering + Eslint
------------
# What use this Starter App?
- **JWT** for protect routes.
- **Clustering mode** for load many forks depending of the CPU's units.
- **Mongoose** for ORM.
- **ES2015** with the last of javascript like promises and async/await.
- **Mocha and Chai** for testing.
##Structure
```json
/app
	/controllers (Controllers of the app)
	/middlewares (Middlewares for the routes of the app)
	/routes (Routes for Controllers of the app)
	/service (Services for using in any Controller)
	/models (Models configuration for use)
	Router.js (Config file for Routing)
config.json (Config file for the app)
server.js (Main file to start the app)
```
# Install
1. First clone this repository.
		https://github.com/camesine/node-restful-starter.git
2. Download all dependencies.
		npm install
3. Edit the file ./config.json with your own settings:
```json
	{
    "SECRET": "HltH3R3",
    "PORT": 1344,
    "DATABASE": {
        "SERVER": "mongodb://127.0.0.1:27017/sampledatabase"}
    }
```
## Start App
When execute any of this commands the app start with clustering, creating many cluster apps depending of the numbers of CPU's your computer had.
## Development
		npm run dev -> (./node_modules/.bin/nodemon server.js --exec ./node_modules/.bin/babel-node)
	In Development mode the express app is starter with nodemon for automatic refresh when do changes.
## Production
		npm start -> (./node_modules/.bin/babel-node server.js)
## Test
        npm test -> (./node_modules/.bin/_mocha --require babel-core/register)