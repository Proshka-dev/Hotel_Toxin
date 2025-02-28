// Функция по назначению обработчиков событий на открытие и закрытие списка
interface IDropdownParams {
    buttonElement: HTMLElement,
    listElement: HTMLElement,
    buttonListOpnenedClass: string,
    buttonActiveClass: string,
    listVisibleClass: string
}
const dropdownOpenAndCloseActions = function (params: IDropdownParams) {
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
    document.addEventListener('click', function (e) {
        if (e.target !== buttonElement) {
            //снимаем визуальное отображение фокуса
            buttonElement.classList.remove(buttonActiveClass);
            //скрываем список
            listElement.classList.remove(listVisibleClass);
            //убираем кнопке атрибут, по которому менняется стрелка
            buttonElement.classList.remove(buttonListOpnenedClass);
        }
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

// Функция установки окончания существительного в зависимости от числительного
function numWord(value: number, words: string[]): string {
    value = Math.abs(value) % 100;
    const num = value % 10;

    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
}


/**
 * Активирование dropdown
 */
const dropdownActivate = () => {
    // Выборка всех .dropdown и обработка каждого
    document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
        const classDropdownInput = 'dropdown__input';
        const classButtonInc = 'dropdown__button-inc';
        const classButtonDec = 'dropdown__button-dec';
        const classValue = 'dropdown__value';
        const classButtonDecInactive = 'dropdown__button-dec_inactive';
        const classButtonActive = 'dropdown__button_active';
        const classButtonListOpnened = 'dropdown__button_listopened';
        const classListVisible = 'dropdown__list_visible';

        const classApplyButton = 'dropdown__button-apply';
        const classClearButton = 'dropdown__button-clear';
        const classClearButtonInactive = 'dropdown__button-clear_inactive';
        const classButtonsContainerInactive = 'dropdown__buttons-container_inactive';

        const dropdownInputs = dropdownWrapper.querySelectorAll('.dropdown__input');
        const dropdownButton = dropdownWrapper.querySelector('.dropdown__button');
        const dropdownList = dropdownWrapper.querySelector('.dropdown__list');

        const dropdownInput1 = (dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='1']"));
        const dropdownInput2 = dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='2']");
        const dropdownInput3 = dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='3']");

        const dropdownItem1 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='1']");
        const dropdownItem2 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='2']");
        const dropdownItem3 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='3']");

        const dropdownClearButton = dropdownWrapper.querySelector("." + classClearButton);

        const dropdownButtonsContainer = dropdownWrapper.querySelector('.dropdown__buttons-container');

        //dropdownItem1.querySelector('.' + classValue).innerHTML = String(val1);
        //dropdownItem2.querySelector('.' + classValue).innerHTML = String(val2);
        //dropdownItem3.querySelector('.' + classValue).innerHTML = String(val3);

        // Проверяем успешность селекторов
        if (!(
            dropdownItem1
            && dropdownItem2
            && dropdownItem3
            && dropdownList
            && dropdownInput1
            && dropdownInput2
            && dropdownInput3
            && dropdownButton
            && dropdownClearButton
            && dropdownButtonsContainer
        )) return; // Если undefined - прервать выполнение функции

        const dropdownValue1 = dropdownItem1.querySelector('.' + classValue);
        const dropdownValue2 = dropdownItem2.querySelector('.' + classValue);
        const dropdownValue3 = dropdownItem3.querySelector('.' + classValue);

        const buttonDec1 = dropdownItem1.querySelector('.' + classButtonDec);
        const buttonDec2 = dropdownItem2.querySelector('.' + classButtonDec);
        const buttonDec3 = dropdownItem3.querySelector('.' + classButtonDec);

        // Проверяем успешность селекторов
        if (!(
            dropdownValue1
            && dropdownValue2
            && dropdownValue3
            && buttonDec1
            && buttonDec2
            && buttonDec3
        )) return; // Если undefined - прервать выполнение функции

        // Проверяем наличие свойств
        if (!(
            ("value" in dropdownInput1)
            && ("value" in dropdownInput2)
            && ("value" in dropdownInput3)
        )) return; // Если undefined - прервать выполнение функции

        // Запоминаем заголовок по умолчанию
        const placeholder = dropdownButton.innerHTML;

        console.log(buttonDec1, buttonDec2, buttonDec3);


        // Вызов функции назначения обработчиков для открытия и закрытия списка
        dropdownOpenAndCloseActions({
            buttonElement: (dropdownButton as HTMLElement),
            listElement: (dropdownList as HTMLElement),
            buttonListOpnenedClass: classButtonListOpnened,
            buttonActiveClass: classButtonActive,
            listVisibleClass: classListVisible
        });

        // buttonElement: HTMLElement,
        // listElement: HTMLElement,
        // buttonListOpnenedClass: string,
        // buttonActiveClass: string,
        // listVisibleClass: string


        // Обработка нажатий на списке
        dropdownList.addEventListener('click', function (e) {
            let target = (e.target) as HTMLElement; // где был клик? (!!!!!)
            let addedAdult = false;

            if (!target) return; // Если undefined - прервать выполнение функции

            //Если click сработало на classButtonInc или classButtonDec
            if ((target.classList.contains(classButtonInc)) || (target.classList.contains(classButtonDec))) {

                // Определяем родитея, потомком которого является нажатая кнопка, получаем data-id
                const currItem = (target.parentNode) as HTMLElement;

                if (!currItem || !currItem.dataset) return;

                const currItemDataId = currItem.dataset.id;

                // Находим Inpit с таким же data-id
                const currInput = dropdownWrapper.querySelector("." + classDropdownInput + "[data-id='" + currItemDataId + "']");
                if (!currInput) return;

                // Запоминаем старое значение
                if (!("value" in currInput)) return;
                const oldValue = Number(currInput.value);

                // определяем тип операции
                let increment = 0;
                if (target.classList.contains(classButtonInc)) {
                    increment = 1;
                } else {
                    increment = -1;
                }

                // определяем новое значение
                const newValue = oldValue + increment;

                // Изменяем значение, если новое значение >= 0
                if (newValue >= 0) {
                    // Изменяем значение, записанное в Input.value
                    currInput.value = newValue;

                    //Если тип дропдауна = 1 и количество взрослых <= 1, а количество детей и младенцев больше 0
                    // то устанавливаем количество взрослых на 1
                    let dropdownType = 1; //Тип по умолчанию
                    if ((dropdownWrapper as HTMLElement).dataset) { //Если у dropdownWrapper есть аттрибут dataset
                        if ((dropdownWrapper as HTMLElement).dataset.type === '2') {
                            dropdownType = 2;
                        }
                    }

                    if ((dropdownType === 1) && (Number(dropdownInput1.value) <= 1)) {
                        // Если есть дети / младенцы
                        if ((Number(dropdownInput2.value) + Number(dropdownInput3.value)) > 0) {
                            //добавляем 1 взрослого
                            dropdownInput1.value = '1';
                            addedAdult = true;
                        }
                    }

                    // ********* Отображение значений dropdownInput ***************
                    const val1 = Number(dropdownInput1.value);
                    const val2 = Number(dropdownInput2.value);
                    const val3 = Number(dropdownInput3.value);
                    dropdownValue1.innerHTML = String(val1);
                    dropdownValue2.innerHTML = String(val2);
                    dropdownValue3.innerHTML = String(val3);

                    // ********** Управление активностью кнопок "-" ***************
                    // Кнопка 1
                    if ((val1 === 0) || ((dropdownType === 1) && ((val1 === 1) && ((val2 + val3) > 0)))) {
                        buttonDec1.classList.add(classButtonDecInactive);
                    } else {
                        buttonDec1.classList.remove(classButtonDecInactive);
                    };
                    // Кнопка 2
                    if (val2 === 0) {
                        buttonDec2.classList.add(classButtonDecInactive);
                    } else {
                        buttonDec2.classList.remove(classButtonDecInactive);
                    };
                    // Кнопка 3
                    if (val3 === 0) {
                        buttonDec3.classList.add(classButtonDecInactive);
                    } else {
                        buttonDec3.classList.remove(classButtonDecInactive);
                    };
                    // Кнопка "Очистить"
                    if ((val1 === 0) && (val2 === 0) && (val3 === 0)) {
                        dropdownClearButton.classList.add(classClearButtonInactive);
                    } else {
                        dropdownClearButton.classList.remove(classClearButtonInactive);
                    };


                    console.log(val1, val2, val3);

                    // **************** Вызываем собитие input ****************
                    const event = new Event('input');
                    currInput.dispatchEvent(event);
                    if (addedAdult) { dropdownInput1.dispatchEvent(event); };

                    // ************* Формируем заголовок на кнопке *************
                    const sum = val1 + val2 + val3;
                    if (dropdownType === 1) {
                        if (sum === 0) {
                            dropdownButton.innerHTML = placeholder;
                        } else {
                            dropdownButton.innerHTML = String(sum) + ' ' + numWord(sum, ["гость", "гостя", "гостей"]);
                        }
                    } else {
                        if (sum === 0) {
                            dropdownButton.innerHTML = placeholder;
                        } else {
                            let caption = '';
                            if (val1 > 0) {
                                if (caption !== '') { caption = caption + ', ' };
                                caption = caption + String(val1) + ' ' + numWord(val1, ["спальня", "спальни", "спален"]);
                            }
                            if (val2 > 0) {
                                if (caption !== '') { caption = caption + ', ' };
                                caption = caption + String(val2) + ' ' + numWord(val2, ["кровать", "кровати", "кроватей"]);
                            }
                            if (val3 > 0) {
                                if (caption !== '') { caption = caption + ', ' };
                                caption = caption + String(val3) + ' ' + numWord(val3, ["ванная комната", "ванные комнаты", "ванных комнат"]);
                            }
                            dropdownButton.innerHTML = caption;
                        }
                    }
                }
            }

            //Если click сработало на кнопке "Применить"
            if (target.classList.contains(classApplyButton)) {
                //снимаем визуальное отображение фокуса
                dropdownButton.classList.remove(classButtonActive);
                //скрываем список
                dropdownList.classList.remove(classListVisible);
                //убираем кнопке атрибут, по которому менняется стрелка
                dropdownButton.classList.remove(classButtonListOpnened);
            }

            //Если click сработало на кнопке "Очистить"
            if (target.classList.contains(classClearButton)) {
                (dropdownInput1 as HTMLInputElement).value = '0';
                (dropdownInput2 as HTMLInputElement).value = '0';
                (dropdownInput3 as HTMLInputElement).value = '0';
                dropdownValue1.innerHTML = '0';
                dropdownValue2.innerHTML = '0';
                dropdownValue3.innerHTML = '0';
                buttonDec1.classList.add(classButtonDecInactive);
                buttonDec2.classList.add(classButtonDecInactive);
                buttonDec3.classList.add(classButtonDecInactive);
                dropdownClearButton.classList.add(classClearButtonInactive);
                dropdownButton.innerHTML = 'Выберите гостей';
            }

            //останавливаем всплытие
            e.stopPropagation();

            //оставляем фокус на кнопке
            (dropdownButton as HTMLInputElement).focus();
        })

    });
};

export { dropdownActivate };