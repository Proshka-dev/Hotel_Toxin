/************************* Файл с общими данными ************************/
import { changeUserNameInHeader } from '../composite_modules/header/header.js';

// Данные пользователя
let userData = {
    logged: true,
    name: 'Юлий Цезарь',
};

// Массив с продуктами
const products = [
    {
        number: '350',
        type: '',
        price: 5000,
        rating: 3,
        reviews: 77,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room350-01.jpg',
            'room350-02.jpg',
            'room350-03.jpg',
            'room350-04.jpg',
        ]
    },
    {
        number: '352',
        type: '',
        price: 5000,
        rating: 3,
        reviews: 55,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room352-01.jpg',
            'room352-02.jpg',
            'room352-03.jpg',
            'room352-04.jpg',
        ]
    },
    {
        number: '444',
        type: '',
        price: 5000,
        rating: 3,
        reviews: 15,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room444-01.jpg',
            'room444-02.jpg',
            'room444-03.jpg',
            'room444-04.jpg',
        ]
    },
    {
        number: '450',
        type: '',
        price: 5300,
        rating: 4,
        reviews: 39,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room450-01.jpg',
            'room450-02.jpg',
            'room450-03.jpg',
            'room450-04.jpg',
        ]
    },
    {
        number: '665',
        type: '',
        price: 5000,
        rating: 5,
        reviews: 25,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room665-01.jpg',
            'room665-02.jpg',
            'room665-03.jpg',
            'room665-04.jpg',
        ]
    },
    {
        number: '678',
        type: '',
        price: 5500,
        rating: 5,
        reviews: 45,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room678-01.jpg',
            'room678-02.jpg',
            'room678-03.jpg',
            'room678-04.jpg',
        ]
    },
    {
        number: '740',
        type: '',
        price: 6000,
        rating: 4,
        reviews: 44,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room740-01.jpg',
            'room740-02.jpg',
            'room740-03.jpg',
            'room740-04.jpg',
        ]
    },
    {
        number: '840',
        type: '',
        price: 9900,
        rating: 4,
        reviews: 65,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room840-01.jpg',
            'room840-02.jpg',
            'room840-03.jpg',
            'room840-04.jpg',
        ]
    },
    {
        number: '856',
        type: '',
        price: 7300,
        rating: 4,
        reviews: 19,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room856-01.jpg',
            'room856-02.jpg',
            'room856-03.jpg',
            'room856-04.jpg',
        ]
    },
    {
        number: '888',
        type: 'люкс',
        price: 9900,
        rating: 5,
        reviews: 145,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room888-01.jpg',
            'room888-02.jpg',
            'room888-03.jpg',
            'room888-04.jpg',
        ]
    },
    {
        number: '980',
        type: 'люкс',
        price: 8500,
        rating: 3,
        reviews: 35,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room980-01.jpg',
            'room980-02.jpg',
            'room980-03.jpg',
            'room980-04.jpg',
        ]
    },
    {
        number: '982',
        type: '',
        price: 5800,
        rating: 3,
        reviews: 56,
        rules: { smoke: true, pets: false, manyguests: true },
        accessibility: { wideCorridor: true, disabledAssistant: false },
        amenities: {
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
            breakfast: true,
            desk: false,
            highChair: true,
            crib: true,
            tv: true,
            shampoo: true,
        },
        images: [
            'room982-01.jpg',
            'room982-02.jpg',
            'room982-03.jpg',
            'room982-04.jpg',
        ]
    },

]



// const products = [
//     { id: 'prod1', name: 'Название1' },
//     { id: 'prod2', name: 'Название2' },
//     { id: 'prod3', name: 'Название3' },
//     { id: 'prod4', name: 'Название4' },
//     { id: 'prod5', name: 'Название5' },
//     { id: 'prod6', name: 'Название6' },
//     { id: 'prod7', name: 'Название7' },
//     { id: 'prod8', name: 'Название8' },
//     { id: 'prod9', name: 'Название9' },
//     { id: 'prod10', name: 'Название10' },
//     { id: 'prod11', name: 'Название11' },
//     { id: 'prod12', name: 'Название12' },
//     { id: 'prod13', name: 'Название13' },
//     { id: 'prod14', name: 'Название14' },
//     { id: 'prod15', name: 'Название15' },
//     { id: 'prod16', name: 'Название16' },
//     { id: 'prod17', name: 'Название17' },
//     { id: 'prod18', name: 'Название18' },
//     { id: 'prod19', name: 'Название19' },
//     { id: 'prod20', name: 'Название20' },
//     { id: 'prod21', name: 'Название21' },
//     { id: 'prod22', name: 'Название22' },
//     { id: 'prod23', name: 'Название23' },
//     { id: 'prod24', name: 'Название24' },
//     { id: 'prod25', name: 'Название25' },
//     { id: 'prod26', name: 'Название26' },
//     { id: 'prod27', name: 'Название27' },
//     { id: 'prod28', name: 'Название28' },
//     { id: 'prod29', name: 'Название29' },
//     { id: 'prod30', name: 'Название30' },
// ]
/****************************** Функции *********************************/
/** Функция обновления статуса пользователя */
const updateUserStatus = () => {
    const bodyElement = document.querySelector('body');
    if (userData.logged) {
        bodyElement.classList.add('_userlogged');
        changeUserNameInHeader(userData.name); // смена имени пользователя
    } else {
        bodyElement.classList.remove('_userlogged');
        changeUserNameInHeader(''); // смена имени пользователя
    };
};

export { products, updateUserStatus };
