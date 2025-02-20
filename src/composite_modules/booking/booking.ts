import { bookingParams } from '../../pages/main/main.js';

// Функция разделения числа по разрядам
function divideNumDigits(num: number) {
    return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

// ********************************************************************************************
// *******************************  Основная часть  *******************************************
// ********************************************************************************************

// interface IBookingParams {
//     number: string;
//     type: string;
//     price: number;
//     discountChild: number;
//     discountBaby: number;
//     serviceFee: number;
//     serviceFeeDiscount: number;
//     additionalServiceFee: number;
//     days: number;
// };

// ********************************************************************************************
// Обновление данных карточки заказа
const bookingUpdateCard = () => {
    const bookingWrapper = document.querySelector('.booking') as HTMLElement;
    const bookingElementRoomNumber = bookingWrapper.querySelector('.booking__number') as HTMLElement;
    const bookingElementType = bookingWrapper.querySelector('.booking__type') as HTMLElement;
    const bookingElementPrice = bookingWrapper.querySelector('.booking__price') as HTMLElement;
    const bookingElementPeriod = bookingWrapper.querySelector('.booking__period') as HTMLElement;
    const bookingElementPeriodPrice = bookingWrapper.querySelector('.booking__period-price') as HTMLElement;
    const bookingElementFeeInfo = bookingWrapper.querySelector('.booking__fee-info') as HTMLElement;
    const bookingElementFeePrice = bookingWrapper.querySelector('.booking__fee-price') as HTMLElement;
    const bookingElementAddfeeInfo = bookingWrapper.querySelector('.booking__addfee-info') as HTMLElement;
    const bookingElementAddfeePrice = bookingWrapper.querySelector('.booking__addfee-price') as HTMLElement;
    const bookingElementDiscountPrice = bookingWrapper.querySelector('.booking__discount-price') as HTMLElement;
    const bookingElementTotalPrice = bookingWrapper.querySelector('.booking__total-price') as HTMLElement;

    const rangeInputs = bookingWrapper.querySelectorAll('.booking__dropdown-date-split input');
    const inputRangeFrom = rangeInputs[0] as HTMLInputElement
    const inputRangeTo = rangeInputs[1] as HTMLInputElement

    const guestsInputs = bookingWrapper.querySelectorAll('.booking__guests input');
    const inputAdult = guestsInputs[0] as HTMLInputElement
    const inputChildren = guestsInputs[1] as HTMLInputElement
    const inputBabies = guestsInputs[2] as HTMLInputElement

    // Объект для более удобного доступа к элементам
    const elem = {
        wrapper: bookingWrapper,
        roomNumber: bookingElementRoomNumber,
        type: bookingElementType,
        price: bookingElementPrice,
        period: bookingElementPeriod,
        periodPrice: bookingElementPeriodPrice,
        feeInfo: bookingElementFeeInfo,
        feePrice: bookingElementFeePrice,
        addFeeInfo: bookingElementAddfeeInfo,
        addFeePrice: bookingElementAddfeePrice,
        discountPrice: bookingElementDiscountPrice,
        totalPrice: bookingElementTotalPrice,
        inputRangeFrom,
        inputRangeTo,
        inputAdult,
        inputChildren,
        inputBabies,
    };

    // Перебираем все свойства у elem. Если хотя-бы одно не определено - прерываем выполнение
    for (let key in elem) { if (!key) return };

    // выводим данные в карточку заказа
    elem.roomNumber.innerText = bookingParams.roomNumber;
    elem.type.innerText = bookingParams.type;
    elem.price.innerText = divideNumDigits(bookingParams.price) + '₽';
    elem.period.innerText = divideNumDigits(bookingParams.price) + '₽ x ' + String(bookingParams.days) + ' суток';
    elem.periodPrice.innerText = divideNumDigits(bookingParams.price * bookingParams.days) + '₽';
    elem.feePrice.innerText = divideNumDigits(bookingParams.serviceFee) + '₽';
    elem.addFeePrice.innerText = divideNumDigits(bookingParams.additionalServiceFee) + '₽';
    elem.discountPrice.innerText = divideNumDigits(-bookingParams.Discount) + '₽';
    elem.totalPrice.innerText = divideNumDigits(bookingParams.price * bookingParams.days + bookingParams.serviceFee
        + bookingParams.additionalServiceFee - bookingParams.Discount) + '₽';
};

// ********************************************************************************************
// Инициалмзация обработчика изменений в диапазоне дат
const bookingChangeRangeHandlerInitialization = () => {
    const bookingWrapper = document.querySelector('.booking') as HTMLElement;
    if (!bookingWrapper) { return };

    const rangeInputs = bookingWrapper.querySelectorAll('.booking__dropdown-date-split input');
    const inputRangeFrom = rangeInputs[0] as HTMLInputElement
    const inputRangeTo = rangeInputs[1] as HTMLInputElement
    if ((!inputRangeFrom) || (!inputRangeTo)) { return };

    console.log('input:', inputRangeFrom);

    inputRangeFrom.addEventListener('input', () => {
        console.log('input event');
        const dateFrom = Date.parse(inputRangeFrom.value);
        const dateTo = Date.parse(inputRangeTo.value);
        if ((dateFrom) && (dateTo)) {
            console.log('inside if - from:', dateFrom, ' to', dateTo);
        } else {
            console.log('from:', dateFrom, ' to', dateTo);
        };
    });

    inputRangeFrom.addEventListener('change', () => {
        console.log('change event');
    });

};

export {
    bookingUpdateCard, bookingChangeRangeHandlerInitialization
};
