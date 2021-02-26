const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const scandir = require('scandir')
const webpack = require('webpack')
const fs = require('fs')

let componentsFilter = /(\.vue|(X|Api|Models)\.ts)$/
let awcacheFileFilter = /^([a-z]|[0-9]){128}\.json\.gzip$/
let coreFile = [
  "App.vue"
]

/**
 * Getting a namespace basing on a file name
 *
 * @param file File
 * @returns {string}
 */
function getNameSpaceByFile(file) {
  let nameSpace = '@components/';
  if (file.base.indexOf('Api.ts') > -1) {
    nameSpace = '@api/'
  }
  else if (file.base.indexOf('Core.ts') > -1 || coreFile.indexOf(file.base) > -1) {
    nameSpace = '@core/'
  }
  else if (file.base.indexOf('Models.ts') > -1) {
    nameSpace = '@models/'
  }
  return nameSpace + file.name
}

/**
 * Scanning a path, generating Webpack and Typescript aliases
 *
 * @param confWP         WebPack base configuration
 * @param confTS         TypeScript base configuration
 * @param dirTS          Typescript tsconfig creation directory
 * @param componentsDir  Scanned directory
 * @param onend          Callback
 * @param baseNameSpaces (opt) Preformated aliases : used to detect the missing components.
 */
function scanVue(confWP, confTS, dirTS, componentsDir, onend) {
  let nameSpaces = []
  console.log("===========================================")
  console.log("= GENERATING PATHS                        =")
  console.log("===========================================")
  console.log("| CORE PRESETS :")
  console.log(coreFile)
  console.log("-------------------------------------------")
  scandir.create()
    .on('file', (filePath) => {
      let file = path.parse(filePath)
      let nameSpace = getNameSpaceByFile(file)
      nameSpaces[nameSpace] = filePath
      confWP.resolve.alias[nameSpace] = filePath
      confTS.compilerOptions.paths[nameSpace] = [file.dir + path.sep + file.name]
      console.log("|>" + nameSpace)
      console.log("|>>" + file.dir + path.sep + file.name)
      console.log("-------------------------------------------")
    })
    .on('end', () => {
      confWP.plugins.push(
        new webpack.DefinePlugin({
          COMPONENTS: JSON.stringify(nameSpaces)
        })
      );
      fs.writeFile(
        dirTS + '/tsconfig.json',
        JSON.stringify(confTS),
        (err) => {
          if (err) {
            console.error(err)
          }
          onend(confWP)
        });
    })
    .scan({
      dir:    componentsDir,
      filter: componentsFilter
    });
}

module.exports = {
  /**
   * Getting a basic WebPack configuration
   *
   * @param entry
   * @param outputPath
   * @param publicPath
   * @param configTSPath
   * @param sassUtilsFile
   * @returns object
   */
  getBaseWPConfig:       (entry, outputPath, publicPath, configTSPath, sassOpt = false) => {
    return {
      mode:    'production',
      resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias:      {
          'vue$': 'vue/dist/vue.esm.js'
        }
      },
      entry:   {
        app: entry
      },
      output:  {
        filename:      '[name]-dist.js',
        chunkFilename: '[name]-dist.js',
        path:          outputPath,
        publicPath:    publicPath
      },
      module:  {
        rules: [
          {
            test:   /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.css$/,
            use:  [
              'style-loader', 'vue-style-loader', 'css-loader'
            ]
          },
          {
            test: /\.sass$/,
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: sassOpt ? sassOpt.sass : {}
              },
            ],
          },
          {
            test: /\.scss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: sassOpt ? sassOpt.scss : {}
              },
            ],
          },
          {
            test:    /\.tsx?$/,
            exclude: /node_modules/,
            use:     {
              options: {
                useTranspileModule:   true,
                forceIsolatedModules: true,
                useCache:             true,
                useBabel:             true,
                babelOptions:         {
                  babelrc: false /* Important line */,
                  presets: [
                    ["@babel/preset-env", {"targets": "last 2 versions, ie 11", "modules": false}]
                  ]
                },
                reportFiles:          ['src/**/*.{ts,tsx}'],
                babelCore:            '@babel/core'
              },
              loader:  'awesome-typescript-loader'
            }
          },
          {
            test: /app.js$/,
            use:  {
              loader:  'babel-loader',
              options: {
                presets: [
                  ["@babel/preset-env", {"targets": "last 2 versions, ie 11", "modules": false}]
                ]
              }
            }
          },
        ]
      },
      plugins: [
        new VueLoaderPlugin()
      ]
    }
  },
  /**
   * Getting a basic Typescript configuration
   *
   * @param outDir
   * @param includePath
   * @param excludes
   * @returns object
   */
  getBaseTSConfig:       (outDir, includePath, excludes) => {
    excludes = excludes ? excludes : [];
    return {
      "compilerOptions": {
        "outDir":                       outDir,
        "sourceMap":                    true,
        "strict":                       true,
        "noImplicitReturns":            true,
        "experimentalDecorators":       true,
        "allowSyntheticDefaultImports": true,
        "noImplicitAny":                false,
        "module":                       "es2015",
        "moduleResolution":             "node",
        "target":                       "es5",
        "lib":                          [
          "dom",
          "es5",
          "es2015.promise"
        ],
        "baseUrl":                      "./",
        "paths":                        {}
      },
      "include":         [
        includePath + '/*.ts',
        includePath + '/*.tsx',
        includePath + '/*.vue'
      ],
      "exclude":         excludes
    }
  },
  /**
   * See ScanVue function
   */
  scanVue:               scanVue,
  purgeAWCache: (awDir, onend) => {
    if (!fs.existsSync(awDir)) {
      fs.mkdir(
        awDir,
        () => {
          onend();
        }
      )
      return
    }
    scandir.create()
      .on('file', (filePath) => {
        fs.unlinkSync(filePath);
      })
      .on('end', () => {
        onend();
      })
      .scan(
        {
          dir: awDir,
          filter: awcacheFileFilter
        }
      )
  }

};
