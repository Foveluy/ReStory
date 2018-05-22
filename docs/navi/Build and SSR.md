# Build

Just simply run this command:

```bash
restory build path/to/target
```

## Two version

During the build phase, Restory will build two version of your site: `client site render` and `server site render`.

```bash
.
├── README.md
├── build # build folder for client site render
├── navi
├── server # simple `out-of-the-box` node.js server for SSR!
└── serverbuild   # serverbuild folder for server site render
```

When the building phase is finished , Restory will create a `server` folder, it is a simple `out-of-the-box` node.js server for SSR!

## Setup the out-of-the-box server for SSR

Before we doing this , we have to install some node.js package.

```bash
# setup package.json
npm init -y

# install presets
npm install --save babel-register babel-preset-env babel-preset-react-app

# install express and  react、 react-helmet
npm install --save express react react-helmet
```

After doing those, we just:

```bash
node ./server/index
```

then your server is running on port `3000`.

# Custom SSR

You may be thinking, if you want to do SSR by yourself, what should you do?

In the SSR version of build, we have a `main.xxxxx.js` in the `serverbuild/static/js` folder. And this `main.xxxxx.js` will `exports` a function called `R`, you can do things like this:

```js
const { R } = require('serverbuild/static/js/main.xxxxx.js')

// Create a store and sense of history based on the current path
const history = {}

// render the html
const html = config.R({ context: history, location: req.path })
```

then you can inject client site's `main.xxxxx.js` in the `build/static/js` into this html string.
