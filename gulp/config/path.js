// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        pug: `${buildFolder}/`,
        fonts: `${buildFolder}/fonts/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/js/`,
    },
    src: {
        pug: `${srcFolder}/pages/**/*.pug`,
        fonts: `${srcFolder}/fonts/`,
        ts: `${srcFolder}/**/*.ts`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/pages/**/*.scss`,
        html: `${srcFolder}/*.html`,
        node_modules_js: `./node_modules/air-datepicker/air-datepicker.js`,
        node_modules_css: `./node_modules/air-datepicker/air-datepicker.css`,
    },
    watch: {
        pug: `${srcFolder}/**/*.pug`,
        ts: `${srcFolder}/**/*.ts`,
        js: `${srcFolder}/**/*.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        scss: `${srcFolder}/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        copy_js: `./node_modules/air-datepicker/air-datepicker.js`,
        copy_css: `./node_modules/air-datepicker/air-datepicker.css`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
}