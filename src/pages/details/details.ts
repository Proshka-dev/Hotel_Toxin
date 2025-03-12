/** Импорт данных и функций из common.js */
import { updateUserStatus, products } from '../../common/common.js';


import { paginate } from '../../modules/pagination/pagination.js';

/** Импорт функций для активации модулей */
import { buttonLikeActivate } from '../../modules/button-like/button-like.js';
import { checkboxListExpActivate } from '../../modules/checkbox-list-exp/checkbox-list-exp.js';
import { dropdownActivate } from '../../modules/dropdown/dropdown.js';
import { dropdownDateFilterActivate } from '../../modules/dropdown-date-filter/dropdown-date-filter.js';
import { dropdownDateSplitActivate } from '../../modules/dropdown-date-split/dropdown-date-split.js';
import { menuActivate } from '../../modules/menu/menu.js';
import { sliderRangeActivate } from '../../modules/slider-range/slider-range.js';
import { chartUpdate } from '../../modules/chart/chart.js';

/** Импорт функций для активации составных модулей */
import { bookingUpdateCard, bookingChangeHandlersInitialization } from '../../composite_modules/booking/booking.js';
import { productActivate } from '../../composite_modules/product/product.js'; // карточка товара



window.addEventListener('DOMContentLoaded', () => {
    updateUserStatus(); // Обновляем статус пользователя
    menuActivate(); // Активация функционала меню

    /** Активирование функций модулей */
    // buttonLikeActivate();
    // checkboxListExpActivate();
    // dropdownActivate();
    // dropdownDateFilterActivate();
    //dropdownDateSplitActivate();
    // sliderRangeActivate();
    // paginate(products);

    /** Активирование функций составных модулей */
    bookingUpdateCard();
    bookingChangeHandlersInitialization();
    //productActivate();

    chartUpdate([40, 30, 20, 10]);


});

// *********************************************************************************
//                              Функции
// *********************************************************************************

// *********************************************************************************
//                              Экспорт
// *********************************************************************************