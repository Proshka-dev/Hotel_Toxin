/************************* Файл с общими данными ************************/
import { changeUserNameInHeader } from '../composite_modules/header/header.js';

// Данные пользователя
let userData = {
    logged: false,
    name: 'Юлий Цезарь',
};

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

window.addEventListener('DOMContentLoaded', () => {
    // Обновляем статус пользователя.
    //  Вызываем при загрузке, либо после смены статуса (залогинен/не залогинен)
    updateUserStatus();
});

export { products };

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
