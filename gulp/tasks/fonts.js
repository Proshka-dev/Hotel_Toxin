// Копирование
import gulpCopy from 'gulp-copy'; // переименование

export const fonts = () => {
    return app.gulp.src(app.path.src.fonts, { encoding: false })
        .pipe(app.gulp.dest(app.path.build.fonts))
}