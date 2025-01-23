import fileInclude from "gulp-file-include";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fileInclude()) // собираем из частей (@@include)
        .pipe(app.plugins.replace(/@img\//g, 'img/')) // замена алиаса на путь
        .pipe(app.gulp.dest(app.path.build.html))
}