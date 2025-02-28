/** Импорт данных и функций из common.js */
import { products, updateUserStatus } from '../../common/common.js';

import { paginate } from '../../modules/pagination/pagination.js';

/** Импорт функций для активации модулей */
import { buttonLikeActivate } from '../../modules/button-like/button-like.js';
import { checkboxListExpActivate } from '../../modules/checkbox-list-exp/checkbox-list-exp.js';
import { dropdownActivate } from '../../modules/dropdown/dropdown.js';
import { dropdownDateFilterActivate } from '../../modules/dropdown-date-filter/dropdown-date-filter.js';
import { dropdownDateSplitActivate } from '../../modules/dropdown-date-split/dropdown-date-split.js';
import { menuActivate } from '../../modules/menu/menu.js';
import { sliderRangeActivate } from '../../modules/slider-range/slider-range.js';

/** Импорт функций для активации составных модулей */
import { bookingUpdateCard, bookingChangeHandlersInitialization } from '../../composite_modules/booking/booking.js';
import { productActivate } from '../../composite_modules/product/product.js';


/** Данные для карточки заказа */
let bookingParams = {
    roomNumber: '888',
    type: 'Люкс',
    price: 9990,
    discountChild: 1,
    discountBaby: 1,
    serviceFee: 0,
    Discount: 2179,
    additionalServiceFee: 300,
    days: 0,
};

window.addEventListener('DOMContentLoaded', () => {
    updateUserStatus(); // Обновляем статус пользователя

    /** Активирование функций модулей */
    buttonLikeActivate();
    checkboxListExpActivate();
    dropdownActivate();
    dropdownDateFilterActivate();
    dropdownDateSplitActivate();
    menuActivate();
    sliderRangeActivate();
    paginate(products);

    /** Активирование функций составных модулей */
    bookingUpdateCard();
    bookingChangeHandlersInitialization();
    productActivate();


});

// *********************************************************************************
//                              Экспорт
// *********************************************************************************
export { bookingParams }; // экспорт переменной с данными о карточке заказа