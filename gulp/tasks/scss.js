import dartSass from 'sass'; // препроцессор
import gulpSass from 'gulp-sass'; //плагин для запуска препроцессора
import rename from 'gulp-rename'; // переименование

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Групировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev }) // sourcemaps только в режиме Dev
        //обработка ошибок
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            }))
        )
        // замена алиаса на путь
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        // компиляция scss -> css
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        // Группируем медиа запросы ***if isBuild***
        .pipe(app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
        ))

        // Автопрефиксер ***if isBuild***
        .pipe(app.plugins.if(
            app.isBuild,
            autoprefixer(
                {
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true
                }
            )
        ))

        // Закомментировать, если не нужен не сжатый дубль файла стилей
        .pipe(app.gulp.dest(app.path.build.css))

        // Сжатие стилей
        .pipe(cleanCss())
        // Переименовываем
        .pipe(rename({
            extname: ".min.css"
        }))
        // Путь сохранения результата
        .pipe(app.gulp.dest(app.path.build.css))
}