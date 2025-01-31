//var gulp = require("gulp");
import gulp from "gulp";
import ts from "gulp-typescript";
import flatten from "gulp-flatten";

var tsProject = ts.createProject("tsconfig.json");

// gulp.task("default", function () {
//     return tsProject.src()
//         .pipe(tsProject()).js
//         .pipe(gulp.dest("dist"));
// });





export const tstask = () => {
    //    return app.gulp.src(app.path.src.ts, { sourcemaps: app.isDev }) // sourcemaps только в режиме Dev
    return tsProject.src()
        // Обработка ошибок, вывод ошибки в уведомления win
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "TS",
                message: "Error: <%= error.message %>"
            }))
        )
        // Компилируем TS -> JS
        .pipe(tsProject()).js

        // Убираем пути
        .pipe(flatten())

        // Копируем в папку
        .pipe(app.gulp.dest(app.path.build.js))
}