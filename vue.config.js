const fs = require('fs');
const packageJson = fs.readFileSync('./package.json');
const version = JSON.parse(packageJson).version || 0;
const serverVersion = JSON.parse(packageJson).bar3.serverVersion || 0;
const webpack = require('webpack');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                PACKAGE_VERSION: '"' + version + '"',
                BAR3_SERVER_VERSION: '"' + serverVersion + '"',
            }
        })
    ],

    devtool: 'source-map'
  },
}