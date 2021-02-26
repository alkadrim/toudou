const path = require('path');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const {getBaseWPConfig, getBaseTSConfig, scanVue, purgeAWCache} = require('./webpack.utils');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const rootDir = path.resolve(__dirname, '..');
const srcFile = path.resolve(rootDir, 'src', 'app.js');
const distDir = path.resolve(rootDir, 'dist');
const componentsDir = path.resolve(rootDir, 'components');
const awcache = path.resolve(rootDir, ".awcache");

module.exports = new Promise(
  (resolve) => {
    purgeAWCache(
    awcache,
    () => {
        let confWP = getBaseWPConfig(
          srcFile,
          distDir,
          './dist/',
          __dirname
        );
        confWP.plugins.push(new VuetifyLoaderPlugin())
        confWP.mode = 'development';
        confWP.watch = true;
        let confTS = getBaseTSConfig(
          './dist',
          './components/**',
          ["./node_modules"]
        );
        scanVue(
          confWP,
          confTS,
          rootDir,
          componentsDir,
          (conf) => {
              resolve(conf)
          })
        }
    )
  }
);
