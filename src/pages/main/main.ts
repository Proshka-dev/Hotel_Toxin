//import * as flsFunctions from "./modules/functions.js"
//flsFunctions.isWebp();

// import AirDatepicker from 'air-datepicker';
// import 'air-datepicker/air-datepicker.css';

// new AirDatepicker('#my-element')

// import { sayHello } from "./greet.js"; //Импорт модуля
// console.log(sayHello("TypeScript"));


import { paginate } from '../../modules/pagination/pagination.js';
import { bookingUpdateCard, bookingChangeRangeHandlerInitialization } from '../../composite_modules/booking/booking.js';

// Массив с продуктами
const products = [
    { id: 'prod1', name: 'Название1' },
    { id: 'prod2', name: 'Название2' },
    { id: 'prod3', name: 'Название3' },
    { id: 'prod4', name: 'Название4' },
    { id: 'prod5', name: 'Название5' },
    { id: 'prod6', name: 'Название6' },
    { id: 'prod7', name: 'Название7' },
    { id: 'prod8', name: 'Название8' },
    { id: 'prod9', name: 'Название9' },
    { id: 'prod10', name: 'Название10' },
    { id: 'prod11', name: 'Название11' },
    { id: 'prod12', name: 'Название12' },
    { id: 'prod13', name: 'Название13' },
    { id: 'prod14', name: 'Название14' },
    { id: 'prod15', name: 'Название15' },
    { id: 'prod16', name: 'Название16' },
    { id: 'prod17', name: 'Название17' },
    { id: 'prod18', name: 'Название18' },
    { id: 'prod19', name: 'Название19' },
    { id: 'prod20', name: 'Название20' },
    { id: 'prod21', name: 'Название21' },
    { id: 'prod22', name: 'Название22' },
    { id: 'prod23', name: 'Название23' },
    { id: 'prod24', name: 'Название24' },
    { id: 'prod25', name: 'Название25' },
    { id: 'prod26', name: 'Название26' },
    { id: 'prod27', name: 'Название27' },
    { id: 'prod28', name: 'Название28' },
    { id: 'prod29', name: 'Название29' },
    { id: 'prod30', name: 'Название30' },
]

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
    days: 4,
};

window.addEventListener('DOMContentLoaded', () => {
    //    const productContainer = document.querySelector('.products-list');
    paginate(products);
    bookingUpdateCard();
    bookingChangeRangeHandlerInitialization();
});

// экспорт переменной с данными о карточке заказа
export { bookingParams };
