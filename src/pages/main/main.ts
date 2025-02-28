/** Импорт данных о товарах */
import { products } from '../../common/common.js';

import { paginate } from '../../modules/pagination/pagination.js';
import { bookingUpdateCard, bookingChangeHandlersInitialization } from '../../composite_modules/booking/booking.js';

/** Импорт функций для активации модулей */
import { dropdownActivate } from '../../modules/dropdown/dropdown.js';
import { buttonLikeActivate } from '../../modules/button-like/button-like.js';
import { checkboxListExpActivate } from '../../modules/checkbox-list-exp/checkbox-list-exp.js';


// Данные для карточки заказа
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
    /** Активирование функций модулей */
    dropdownActivate();
    buttonLikeActivate();
    checkboxListExpActivate();


    paginate(products);
    bookingUpdateCard();
    bookingChangeHandlersInitialization();

});

// экспорт переменной с данными о карточке заказа
export { bookingParams };