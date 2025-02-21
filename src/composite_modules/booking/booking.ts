import { bookingParams } from '../../pages/main/main.js';

// Функция разделения числа по разрядам
function divideNumDigits(num: number) {
    return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

//  Преобразование строки "dd.MM.yyyy" в дату
function convertToDate(dateString: String) {
    let d = dateString.split(".");
    let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
    return dat;
}

// Функция рассчета количества дней
function daysBetween(startDate: Date, endDate: Date) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error('Применяйте корректные объекты Date.');
    }

    const diffTime = Math.abs(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
        Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()));
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
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
    const bookingElementButton = bookingWrapper.querySelector('.button-arrow') as HTMLElement;

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
        button: bookingElementButton,
    };

    // Перебираем все свойства у elem. Если хотя-бы одно не определено - прерываем выполнение
    for (let key in elem) { if (!key) return };

    // выводим данные в карточку заказа
    elem.roomNumber.innerText = bookingParams.roomNumber;
    elem.type.innerText = bookingParams.type;
    elem.price.innerText = divideNumDigits(bookingParams.price) + '₽';
    // меняем вывод в зависимости от выбранного количества дней
    if (bookingParams.days > 0) {
        elem.period.innerText = divideNumDigits(bookingParams.price) + '₽ x ' + String(bookingParams.days);
        if (bookingParams.days === 1) {
            elem.period.innerText = elem.period.innerText + ' сутки';
        } else {
            elem.period.innerText = elem.period.innerText + ' суток';
        };
        elem.periodPrice.innerText = divideNumDigits(bookingParams.price * bookingParams.days) + '₽';
        elem.feePrice.innerText = divideNumDigits(bookingParams.serviceFee) + '₽';
        elem.addFeePrice.innerText = divideNumDigits(bookingParams.additionalServiceFee) + '₽';
        elem.discountPrice.innerText = divideNumDigits(-bookingParams.Discount) + '₽';
        elem.totalPrice.innerText = divideNumDigits(bookingParams.price * bookingParams.days + bookingParams.serviceFee
            + bookingParams.additionalServiceFee - bookingParams.Discount) + '₽';
    } else {
        elem.period.innerText = 'Стоимость';
        elem.periodPrice.innerText = '0₽';
        elem.feePrice.innerText = '0₽';
        elem.addFeePrice.innerText = '0₽';
        elem.discountPrice.innerText = '0₽';
        elem.totalPrice.innerText = '0₽';
    };

    // управление активностью кнопки
    if ((Number(elem.inputAdult.value) > 0) && (bookingParams.days > 0)) {
        //Кнопка активна
        elem.button.classList.remove('button-arrow__inactive');
    } else {
        // Кнопка неактивна
        elem.button.classList.add('button-arrow__inactive');
    };

};

// ********************************************************************************************
// Инициалмзация обработчика изменений в диапазоне дат
const bookingChangeHandlersInitialization = () => {
    const bookingWrapper = document.querySelector('.booking') as HTMLElement;
    if (!bookingWrapper) { return };

    const rangeInputs = bookingWrapper.querySelectorAll('.booking__dropdown-date-split input');
    const inputRangeFrom = rangeInputs[0] as HTMLInputElement
    const inputRangeTo = rangeInputs[1] as HTMLInputElement
    const inputAdult = bookingWrapper.querySelector('.booking__guests input');

    if ((!inputRangeFrom) || (!inputRangeTo) || (!inputAdult)) { return };

    // Обработчик события input на inputRangeTo
    inputRangeTo.addEventListener('input', () => {
        const dateFrom = convertToDate(inputRangeFrom.value);
        const dateTo = convertToDate(inputRangeTo.value);
        if ((dateFrom) && (dateTo)) {
            //const days = Math.round((dateTo - dateFrom) / (1000 * 60 * 60 * 24));
            const days = daysBetween(dateFrom, dateTo);
            console.log('days:', dateTo);
            if (days) {
                bookingParams.days = days;
            } else {
                bookingParams.days = 0;
            }
            bookingUpdateCard();

        };
    });

    // Обработчик события input на inputAdult
    inputAdult.addEventListener('input', () => {
        bookingUpdateCard();
    });



};

export {
    bookingUpdateCard, bookingChangeHandlersInitialization
};
