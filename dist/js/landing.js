/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/common.ts":
/*!******************************!*\
  !*** ./src/common/common.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   products: () => (/* binding */ products),\n/* harmony export */   updateUserStatus: () => (/* binding */ updateUserStatus)\n/* harmony export */ });\n/* harmony import */ var _composite_modules_header_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../composite_modules/header/header.js */ \"./src/composite_modules/header/header.ts\");\n/************************* Файл с общими данными ************************/\n\n// Данные пользователя\nlet userData = {\n    logged: true,\n    name: 'Юлий Цезарь',\n};\n// Массив с продуктами\nconst products = [\n    { id: 'prod1', name: 'Название1' },\n    { id: 'prod2', name: 'Название2' },\n    { id: 'prod3', name: 'Название3' },\n    { id: 'prod4', name: 'Название4' },\n    { id: 'prod5', name: 'Название5' },\n    { id: 'prod6', name: 'Название6' },\n    { id: 'prod7', name: 'Название7' },\n    { id: 'prod8', name: 'Название8' },\n    { id: 'prod9', name: 'Название9' },\n    { id: 'prod10', name: 'Название10' },\n    { id: 'prod11', name: 'Название11' },\n    { id: 'prod12', name: 'Название12' },\n    { id: 'prod13', name: 'Название13' },\n    { id: 'prod14', name: 'Название14' },\n    { id: 'prod15', name: 'Название15' },\n    { id: 'prod16', name: 'Название16' },\n    { id: 'prod17', name: 'Название17' },\n    { id: 'prod18', name: 'Название18' },\n    { id: 'prod19', name: 'Название19' },\n    { id: 'prod20', name: 'Название20' },\n    { id: 'prod21', name: 'Название21' },\n    { id: 'prod22', name: 'Название22' },\n    { id: 'prod23', name: 'Название23' },\n    { id: 'prod24', name: 'Название24' },\n    { id: 'prod25', name: 'Название25' },\n    { id: 'prod26', name: 'Название26' },\n    { id: 'prod27', name: 'Название27' },\n    { id: 'prod28', name: 'Название28' },\n    { id: 'prod29', name: 'Название29' },\n    { id: 'prod30', name: 'Название30' },\n];\n/****************************** Функции *********************************/\n/** Функция обновления статуса пользователя */\nconst updateUserStatus = () => {\n    const bodyElement = document.querySelector('body');\n    if (userData.logged) {\n        bodyElement.classList.add('_userlogged');\n        (0,_composite_modules_header_header_js__WEBPACK_IMPORTED_MODULE_0__.changeUserNameInHeader)(userData.name); // смена имени пользователя\n    }\n    else {\n        bodyElement.classList.remove('_userlogged');\n        (0,_composite_modules_header_header_js__WEBPACK_IMPORTED_MODULE_0__.changeUserNameInHeader)(''); // смена имени пользователя\n    }\n    ;\n};\n\n\n\n//# sourceURL=webpack://hotel-toxin/./src/common/common.ts?");

/***/ }),

/***/ "./src/composite_modules/header/header.ts":
/*!************************************************!*\
  !*** ./src/composite_modules/header/header.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   changeUserNameInHeader: () => (/* binding */ changeUserNameInHeader)\n/* harmony export */ });\n// *********************************************************************************\n//                              Основная часть\n// *********************************************************************************\nconst changeUserNameInHeader = (userName) => {\n    const userNameElement = document.querySelector('.header__username');\n    if (userNameElement) {\n        userNameElement.innerText = userName;\n    }\n    ;\n};\n// *********************************************************************************\n//                              Экспорт\n// *********************************************************************************\n\n\n\n//# sourceURL=webpack://hotel-toxin/./src/composite_modules/header/header.ts?");

/***/ }),

/***/ "./src/modules/menu/menu.ts":
/*!**********************************!*\
  !*** ./src/modules/menu/menu.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   menuActivate: () => (/* binding */ menuActivate)\n/* harmony export */ });\n// *********************************************************************************\n//                              Основная часть\n// *********************************************************************************\nconst menuActivate = () => {\n    const nav = document.querySelector('.menu').parentElement;\n    const submenus = nav.querySelectorAll('.menu__item_expendable');\n    const dropdowns = nav.querySelectorAll('.menu__item_expendable > .menu__submenu');\n    const burgerMenu = document.querySelector('.menu');\n    const burgerIcon = document.querySelector('.header__burger');\n    const burgerMenuBody = burgerMenu.querySelector('.menu__body');\n    // Организовываем открытие/закрытие подменю\n    submenus.forEach((item) => {\n        const dropdown = item.querySelector(':scope > .menu__submenu');\n        const button = item.querySelector(':scope > .menu__button');\n        // открываем/закрываем подменю по клику на кнопку\n        button.addEventListener('click', function (e) {\n            toggleDropdown({ button, dropdown });\n        });\n        // Обрабатываем нажатие на Esc\n        dropdown.addEventListener('keydown', (e) => {\n            //e.stopImmediatePropagation()\n            if (e.code === '27' && focusIsInside(dropdown)) {\n                toggleDropdown({ button, dropdown });\n                button.focus();\n            }\n        }, false);\n    });\n    // Закрываем навигацию, если протапались за её пределы\n    document.addEventListener('keyup', collapseDropdownsWhenTabbingOutsideNav);\n    // Закрываем навигацию, если кликнули вне навигации\n    window.addEventListener('click', collapseDropdownsWhenClickingOutsideNav);\n    // Показываем меню бургер при нажатии иконку бургера\n    burgerIcon.addEventListener('click', openMenuWhenClickIcon);\n    // Скрываем меню бургер при нажатии на Esc\n    window.addEventListener('keydown', closeMenuWhenPressEsc);\n    // Закрываем меню, если кликнули за его пределами\n    window.addEventListener('click', closeMenuWhenClickingOutside);\n    ;\n    function toggleDropdown({ button, dropdown }) {\n        if (button.classList.contains('menu__button_extended')) {\n            button.classList.remove('menu__button_extended');\n            dropdown.classList.add('menu__submenu_hidden');\n        }\n        else {\n            button.classList.add('menu__button_extended');\n            dropdown.classList.remove('menu__submenu_hidden');\n        }\n    }\n    /** Фокус ввода внутри элемента? */\n    function focusIsInside(element) {\n        return element.contains(document.activeElement);\n    }\n    /** Скрытие подменю протапались за его пределы */\n    function collapseDropdownsWhenTabbingOutsideNav(e) {\n        if (e.code === '9' && !focusIsInside(nav)) {\n            dropdowns.forEach(function (dropdown) {\n                dropdown.classList.add('menu__submenu_hidden');\n                const btn = dropdown.parentNode.querySelector('button');\n                btn.classList.remove('menu__button_extended');\n            });\n        }\n    }\n    /** Скрытие подменю по клику снаружи */\n    function collapseDropdownsWhenClickingOutsideNav(e) {\n        const target = e.target;\n        dropdowns.forEach(function (dropdown) {\n            if (!dropdown.parentNode.contains(target)) {\n                dropdown.classList.add('menu__submenu_hidden');\n                const btn = dropdown.parentNode.querySelector('button');\n                btn.classList.remove('menu__button_extended');\n            }\n        });\n    }\n    /** Показываем меню бургер при нажатии иконку бургера */\n    function openMenuWhenClickIcon(e) {\n        console.log('Клик по бургеру');\n        //блокировка скролла body при открытом меню\n        //document.body.classList.toggle('_lock');\n        burgerMenu.classList.add('menu_active');\n    }\n    /** Скрытие меню по нажатию Esc */\n    function closeMenuWhenPressEsc(e) {\n        const target = e.target;\n        if (e.code === 'Escape') {\n            // Если меню активно, отключаем его\n            if (burgerMenu.classList.contains('menu_active')) {\n                burgerMenu.classList.remove('menu_active');\n            }\n        }\n    }\n    /** Скрытие меню по клику снаружи */\n    function closeMenuWhenClickingOutside(e) {\n        const target = e.target;\n        //Если клик не по иконке бургера\n        // и меню открыто\n        // и цель клика не внутри burgerMenuBody\n        if ((target !== burgerIcon) && (burgerMenu.classList.contains('menu_active')) && (!burgerMenuBody.contains(target))) {\n            burgerMenu.classList.remove('menu_active');\n        }\n    }\n};\n// *********************************************************************************\n//                              Экспорт\n// *********************************************************************************\n\n\n\n//# sourceURL=webpack://hotel-toxin/./src/modules/menu/menu.ts?");

/***/ }),

/***/ "./src/pages/landing/landing.ts":
/*!**************************************!*\
  !*** ./src/pages/landing/landing.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/common.js */ \"./src/common/common.ts\");\n/* harmony import */ var _modules_menu_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../modules/menu/menu.js */ \"./src/modules/menu/menu.ts\");\n/** Импорт данных и функций из common.js */\n\n\nwindow.addEventListener('DOMContentLoaded', () => {\n    (0,_common_common_js__WEBPACK_IMPORTED_MODULE_0__.updateUserStatus)(); // Обновляем статус пользователя\n    /** Активирование функций модулей */\n    // buttonLikeActivate();\n    // checkboxListExpActivate();\n    // dropdownActivate();\n    // dropdownDateFilterActivate();\n    // dropdownDateSplitActivate();\n    (0,_modules_menu_menu_js__WEBPACK_IMPORTED_MODULE_1__.menuActivate)();\n    // sliderRangeActivate();\n    // paginate(products);\n    /** Активирование функций составных модулей */\n    // bookingUpdateCard();\n    // bookingChangeHandlersInitialization();\n    // productActivate();\n});\n// *********************************************************************************\n//                              Экспорт\n// *********************************************************************************\n\n\n//# sourceURL=webpack://hotel-toxin/./src/pages/landing/landing.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/landing/landing.ts");
/******/ 	
/******/ })()
;