## iOS and Android
`react-native start` | Starts React Native Packager
`react-native run-ios` | Runs the iOS app
`react-native run-android` | Runs the Android app

## Web
`react-native-web` does not use the React Native Packager, so you need to use [webpack](https://webpack.github.io/) to compile your app. This example app contains a complete webpack configuration that is optimized for development and production.

`npm run web:build` | Builds your app for production. <br/>(Runs `web:build:vendor` and `web:build:app`.)
`npm run web:build:vendor` | Builds the `react-native-web` library for production.
`npm run web:build:app` | Builds your app, and any implicit vendored libraries.

`./build.sh` | Builds the app anew and changes the generated directories so that they are properly recognized by express

## Heroku
To push the current branch into heroku master commit the files and run `git push heroku branchName:master`. It will then automatically update the code running on server.


## index.html

Your index file is generated from a template at [web/templates/index.ejs](/web/templates/index.ejs).
You can add variables to the [HTMLWebpackPlugin config](web/webpack.config.js#L49-L52) in `web/webpack.config.js`, and use these variables in the template.


### Examples:

In `web/webpack.config.js`:

```js
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'web/templates/index.ejs',
    myVariable: 'foo',
  }),
```

In `web/templates/index.ejs`:

```html
<div><%= htmlWebpackPlugin.options.myVariable %></div>
```

or:

```html
<% if (htmlWebpackPlugin.options.myVariable) { %>
  <div><%= htmlWebpackPlugin.options.myVariable %></div>
<% } %>
```

> See the [HtmlWebpackPlugin README](https://github.com/jantimon/html-webpack-plugin#html-webpack-plugin) for more information.


## Code Splitting

You can add any `react-*` and `react-native-*` libraries to the `entry` section in `vendor.webpack.config.js`. Webpack will compile these libraries separately, and link them with your app's code. (See the [DllPlugin](https://github.com/webpack/docs/wiki/list-of-plugins#dllplugin)). This saves a lot of time during development, because you don't have to keep recompiling your static libraries. This also saves bandwidth when you release an update, because your users will only need to download the updated app bundle.

You can add multiple entry sections to `vendor.webpack.config.js`. I recommend creating another entry for "core" libraries that don't change very often, but are unrelated to `react` or `react-native-web`. In addition to the explicit vendoring in `vendor.webpack.config.js`, webpack will also create an implicitly vendored bundle, for any libraries in `node_modules/`.

Here is an example of what your build directory will look like:

```
javascript/
    vendor/
        lib-6b8747b211107409.js
        react-853080ae05a52a66.dll.js
    app-6b8747b211107409.js
```

* `lib.*.js` is an implicitly vendored bundle, for all libraries in `node_modules`
* `react.*.dll.js` contains `react-native-web` and all of it's dependencies
* `app.*.js` is your app's source code.


## Offline Plugin

If you want your app to be available offline, you can change this line at the top of `web/webpack.config.js`:

```js
const enableOfflinePlugin = false
```

This will automatically configure a ServiceWorker (or AppCache) to download and cache all of your assets, so people will be able to use your app even if they don't have an internet connection.

> The Offline Plugin will only be enabled in the production build.

