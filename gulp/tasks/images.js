export const images = () => {
    return app.gulp.src(app.path.src.images)
        // Обработка ошибок, вывод ошибки в уведомления win
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            }))
        )
        // Получаем изображения (кроме svg)
        .pipe(app.gulp.src(app.path.src.images, {
            encoding: false
        }))
        .pipe(app.gulp.dest(app.path.build.images)) // Копируем в папку

        //Получаем изображения svg
        .pipe(app.gulp.src(app.path.src.svg))
        .pipe(app.gulp.dest(app.path.build.images)) // Копируем в папку
}