// *********************************************************************************
//                              Основная часть
// *********************************************************************************

const checkboxListExpActivate = () => {
    /** Выборка всех .checkbox-list и обработка каждого */
    document.querySelectorAll('.checkbox-list-exp').forEach(function (checkboxListWrapper) {

        // селекторы
        const checkboxListButton = checkboxListWrapper.querySelector('.checkbox-list-exp__button');
        const checkboxListItems = checkboxListWrapper.querySelector('.checkbox-list-exp__items');

        // классы элементов
        const classButtonListOpened = 'checkbox-list-exp__button_listopened';
        const classButtonActive = 'checkbox-list-exp__button_active';
        const classListVisible = 'checkbox-list-exp__items_visible';

        // Вызов функции назначения обработчиков для открытия и закрытия списка
        openAndCloseActions({
            buttonElement: (checkboxListButton as HTMLElement),
            listElement: (checkboxListItems as HTMLElement),
            buttonListOpnenedClass: classButtonListOpened,
            buttonActiveClass: classButtonActive,
            listVisibleClass: classListVisible
        });
    });

}

// *********************************************************************************
//                              Функции
// *********************************************************************************
/** Функция по назначению обработчиков событий на открытие и закрытие списка */
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
};
// *********************************************************************************
export { checkboxListExpActivate }