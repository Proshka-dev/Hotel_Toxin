//import * as flsFunctions from "./modules/functions.js"
//flsFunctions.isWebp();

// import AirDatepicker from 'air-datepicker';
// import 'air-datepicker/air-datepicker.css';

// new AirDatepicker('#my-element')

// import { sayHello } from "./greet.js"; //Импорт модуля
// console.log(sayHello("TypeScript"));


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//import { paginate } from './pagination.js';
import { paginate } from '../../modules/pagination/pagination.js';

const products = [
    { id: 'prod1', name: 'Номер 1' },
    { id: 'prod2', name: 'Номер 2' },
    { id: 'prod3', name: 'Номер 3' },
    { id: 'prod4', name: 'Номер 4' },
    { id: 'prod5', name: 'Номер 5' },
    { id: 'prod6', name: 'Номер 6' },
    { id: 'prod7', name: 'Номер 7' },
    { id: 'prod8', name: 'Номер 8' },
    { id: 'prod9', name: 'Номер 9' },
    { id: 'prod10', name: 'Номер 10' },
    { id: 'prod11', name: 'Номер 11' },
    { id: 'prod12', name: 'Номер 12' },
    { id: 'prod13', name: 'Номер 13' },
    { id: 'prod14', name: 'Номер 14' },
    { id: 'prod15', name: 'Номер 15' },
    { id: 'prod16', name: 'Номер 16' },
    { id: 'prod17', name: 'Номер 17' },
    { id: 'prod18', name: 'Номер 18' },
    { id: 'prod19', name: 'Номер 19' },
    { id: 'prod20', name: 'Номер 20' },
    { id: 'prod21', name: 'Номер 21' },
    { id: 'prod22', name: 'Номер 22' },
    { id: 'prod23', name: 'Номер 23' },
    { id: 'prod24', name: 'Номер 24' },
    { id: 'prod25', name: 'Номер 25' },
    { id: 'prod26', name: 'Номер 26' },
    { id: 'prod27', name: 'Номер 27' },
    { id: 'prod28', name: 'Номер 28' },
    { id: 'prod29', name: 'Номер 29' },
    { id: 'prod30', name: 'Номер 30' },
]

window.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.products-list');
    paginate(products);
});
