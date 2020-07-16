# Birthdays

This is the front-end implementation of a coding challenge.
A live version of this can be found on [birthdays-leokayn.netlify.app](https://birthdays-leokayn.netlify.app/)

## Install and run
To run this code locally, first clone this repo using:
To install dependencies:
```bash
git clone https://github.com/LeonardoKalyn/birthdays-client.git
```

Then enter the repo folder and install the dependencies:
And to run the project :
```bash
cd birthdays-client
npm install
```

Then add the .env file:
```bash
cp ./.env.sample ./env
```
NOTE: This will point you to the live version of the back-end, currently hosted on heroku. You can alternatively run [this project](https://github.com/LeonardoKalyn/birthdays-api)
locally and not use a .env file, or make your own version of the back-end.

Finally, you can run the project using:
```bash
npm start
```
The browser should open on localhose:3000, with the running code.
## Testing

To run the tests you use the following command:
```bash
npm run test
```
It will run the react-script for running tests, that came with create-react-app.

The tests tools can be found at ./package.json on the devDependencies section.

## The Solution
This project was mainly implemented with:
* react.js - as the main framework, and bootraped with create-react-app;
* redux - for state management;
* react-router - for route management;
* sass (via the node-sass lib) - for styling
Aditional libs can be found at ./package.json on the dependencies section.

## Fun facts:
The design of this project was inspired by Katy Perry's [Birthday lyric video](https://www.youtube.com/watch?v=jqYxyd1iSNk)

