import { paginate } from '../../modules/pagination/pagination.js';
import { bookingUpdateCard, bookingChangeHandlersInitialization } from '../../composite_modules/booking/booking.js';
import { products } from '../../common/common.js';

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
    paginate(products);
    bookingUpdateCard();
    bookingChangeHandlersInitialization();
});

// экспорт переменной с данными о карточке заказа
export { bookingParams };