export const copy_js = () => {
    return app.gulp.src(app.path.src.node_modules_js)
        .pipe(app.gulp.dest(app.path.build.js))
}