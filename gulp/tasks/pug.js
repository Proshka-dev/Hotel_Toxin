import pug from "gulp-pug";
import flatten from "gulp-flatten";


export const task_pug = () => {
    return app.gulp.src(app.path.src.pug)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            }))
        )
        // Преобразовение pug -> html
        .pipe(pug({
            pretty: true
        }))
        // замена алиаса на путь
        .pipe(app.plugins.replace(/@img\//g, 'img/'))

        // Убираем пути
        .pipe(flatten())

        .pipe(app.gulp.dest(app.path.build.pug))
}