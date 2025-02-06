// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
};

// Импорт задач
import { task_pug } from "./gulp/tasks/pug.js";
import { copy_js } from "./gulp/tasks/copy_js.js";
import { copy_css } from "./gulp/tasks/copy_css.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { tstask } from "./gulp/tasks/ts.js";
import { images } from "./gulp/tasks/images.js";

// Наблюдатель за изменениями в файлах
function watcher() {
  //аргументы:
  // (путь до папок/файлов за которыми наблюдаем, действие при изменении)
  gulp.watch(path.watch.pug, task_pug);
  // gulp.watch(path.watch.copy_js, copy_js);
  //gulp.watch(path.watch.js, js);
  //gulp.watch(path.watch.copy_css, copy_css);
  //gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  //gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.ts, js);
  gulp.watch(path.watch.images, images);
}

const mainTasks = gulp.parallel(js, copy_css, task_pug, scss, images);

// Построение сценариев выполнения задач
// series выполняет задачи последовательно
const dev = gulp.series(reset, mainTasks, watcher);
const build = gulp.series(reset, mainTasks);

// Экспорт сценариев
export { dev };
export { build };

// Выпролнение сценария по умолчанию
gulp.task("default", dev);
