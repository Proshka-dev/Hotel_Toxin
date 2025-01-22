import webpack from "webpack-stream";

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }) // sourcemaps только в режиме Dev
        // Обработка ошибок, вывод ошибки в уведомления win
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            }))
        )
        //
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js'
            }
        }))
        // Копируем в папку
        .pipe(app.gulp.dest(app.path.build.js))
}