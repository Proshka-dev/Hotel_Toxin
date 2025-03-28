import webpackStream from "webpack-stream";
import webpack from "webpack";
//import fileInclude from "gulp-file-include";
// import webpackConfig from "../../webpack.config.js";

const config = {
  entry: {
    main: './src/pages/main/main.ts',
    landing: './src/pages/landing/landing.ts',
    rooms: './src/pages/rooms/rooms.ts',
    details: './src/pages/details/details.ts',
    registration: './src/pages/registration/registration.ts',
    login: './src/pages/login/login.ts',
  },
  output: {
    //filename: "main.js",
    filename: '[name].js'
  },
  mode: "development",
  module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
    ],
  },

  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
};

export const js = () => {
  return (
    app.gulp
      .src(app.path.src.ts, { sourcemaps: app.isDev }) // sourcemaps только в режиме Dev
      // Обработка ошибок, вывод ошибки в уведомления win
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      // собираем из частей (@@include)
      //.pipe(fileInclude())
      //
      .pipe(webpackStream(config))
      // .pipe(webpack({
      //     mode: app.isBuild ? 'production' : 'development',
      //     output: {
      //         filename: 'app.min.js'
      //     }
      // }))
      // Копируем в папку
      .pipe(app.gulp.dest(app.path.build.js))
  );
};
