// Karma configuration
// Generated on Tue Aug 21 2018 13:38:52 GMT+0800 (CST)
module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '..',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'test/src/**/*.ts',
      'src/index.ts'
    ],

    // list of files / patterns to exclude
    exclude: [
      'src/type/common.d.ts',
      'node_modules'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/src/**/*.ts': ['webpack'],
      'src/index.ts': ['webpack', 'sourcemap']
    },
    webpackMiddleware: {
      stats: 'errors-only'
    },
    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.js', '.ts']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.ts$/,
            exclude: /(node_modules|bower_components|test)/,
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post',
            query: {
              esModules: true
            }
          }
        ]
      },
      node: {
        fs: "empty",
        net: "empty",
        tls: "empty"
      }
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['progress'],
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: './coverage',
      reporters: [
        {
          type: 'lcov',
          subdir: '.'
        },
        { type: 'text-summary' },
        {
          type: 'cobertura',
          subdir: '.',
        }
      ]
    },
    plugins: [
      'karma-mocha',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-sourcemap-loader',
      'webpack',
      'karma-chai'
    ],
    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    // plugins: [
    //   'karma-coverage'
    // ]
  })
}
