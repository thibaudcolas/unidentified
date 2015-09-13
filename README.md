unidentified [![Travis](https://img.shields.io/travis/ThibWeb/unidentified.svg?style=flat-square)](https://travis-ci.org/ThibWeb/unidentified)
==========

> TODO

## Installation

> You first need to clone the project on your computer.

From the command-line:

```sh
cd ~/Development/sites/
git clone git@github.com:ThibWeb/unidentified.git
cd unidentified
```

> We rely on [Node.js](nodejs.org) JavaScript runtime and the [npm](https://www.npmjs.com/) ecosystem. If you don't already have node installed, use `brew install node`.

To install our dependencies, run:

```sh
# Install the linters.
npm install --global eslint babel-eslint eslint-config-airbnb
# Then, install all project dependencies.
npm install
# If that's your thing, install the git hooks:
./.githooks/deploy
```

## Working on the project

> Everything mentioned in the installation process should already be done.

~~~sh
# Start the server and the development tools.
npm run start
# Voilà!
# You can then go to http://localhost:8080/ to see the site running.
# When you feel like it, you can run the tests.
npm run test
~~~

## Deployment

```sh
npm run deploy
```

### First time

```sh
heroku create unidentified
# To try out the Procfile,
gem install foreman
foreman start
```
