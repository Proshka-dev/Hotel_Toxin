//import webpack from "webpack-stream";
import ts from "gulp-typescript";

export const tstask = () => {
    return app.gulp.src(app.path.src.ts, { sourcemaps: app.isDev }) // sourcemaps только в режиме Dev
        // Обработка ошибок, вывод ошибки в уведомления win
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "TS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Компилируем TS -> JS
        .pipe(ts({
            //            declaration: true,
            noImplicitAny: true,
            outFile: 'app.min.js'

        }))

        // Копируем в папку
        .pipe(app.gulp.dest(app.path.build.js))
}