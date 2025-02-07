// *****************************************************************************
// Функция по назначению обработчиков событий на открытие и закрытие списка
// *****************************************************************************
interface IOpenCloseParams {
    buttonElement: HTMLElement,
    listElement: HTMLElement,
    buttonListOpnenedClass: string,
    buttonActiveClass: string,
    listVisibleClass: string
}

const openAndCloseActions = function (params: IOpenCloseParams) {
    const { buttonElement, listElement, buttonListOpnenedClass, buttonActiveClass, listVisibleClass } = params;

    // Событие Click на кнопке (отображаем список, управляем стрелкой, управляем визуальными эффектами кнопки)
    buttonElement.addEventListener('click', function () {
        //отображаем список
        listElement.classList.toggle(listVisibleClass);
        //добавляем/убираем кнопке атрибут, по которому меняется стрелка
        buttonElement.classList.toggle(buttonListOpnenedClass);
        //добавляем визуальный эффект, аналогичный фокусу на кнопке
        buttonElement.classList.add(buttonActiveClass);
    });

    //скрываем по клику снаружи кнопки
    const myCheckboxListWrapper = document.querySelector('.checkbox-list');
    console.log('myCheckboxListWrapper: ', myCheckboxListWrapper);
    // if ((e.target !== buttonElement) && (e.target !== listElement)) {

    document.addEventListener('click', function (e) {

        const target = e.target as HTMLElement;

        if ((target !== buttonElement) && (target.parentElement.parentElement !== listElement)) {
            //снимаем визуальное отображение фокуса
            buttonElement.classList.remove(buttonActiveClass);
            //скрываем список
            listElement.classList.remove(listVisibleClass);
            //убираем кнопке атрибут, по которому менняется стрелка
            buttonElement.classList.remove(buttonListOpnenedClass);
        }
        //e.stopPropagation;
    })

    //скрываем нажатию на Tab или Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            //снимаем визуальное отображение фокуса
            buttonElement.classList.remove(buttonActiveClass);
            //скрываем список
            listElement.classList.remove(listVisibleClass);
            //убираем кнопке атрибут, по которому менняется стрелка
            buttonElement.classList.remove(buttonListOpnenedClass);
        }
    })

};


// *****************************************************************************
// ************** Выборка всех .checkbox-list и обработка каждого **************
// *****************************************************************************
document.querySelectorAll('.checkbox-list').forEach(function (checkboxListWrapper) {

    // селекторы
    const checkboxListButton = checkboxListWrapper.querySelector('.checkbox-list__button');
    const checkboxListItems = checkboxListWrapper.querySelector('.checkbox-list__items');

    // классы элементов
    const classButtonListOpened = 'checkbox-list__button_listopened';
    const classButtonActive = 'checkbox-list__button_active';
    const classListVisible = 'checkbox-list__items_visible';

    // Вызов функции назначения обработчиков для открытия и закрытия списка
    openAndCloseActions({
        buttonElement: (checkboxListButton as HTMLElement),
        listElement: (checkboxListItems as HTMLElement),
        buttonListOpnenedClass: classButtonListOpened,
        buttonActiveClass: classButtonActive,
        listVisibleClass: classListVisible
    });

});