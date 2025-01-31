var dropdownOpenAndCloseActions = function (params) {
    var buttonElement = params.buttonElement, listElement = params.listElement, buttonListOpnenedClass = params.buttonListOpnenedClass, buttonActiveClass = params.buttonActiveClass, listVisibleClass = params.listVisibleClass;
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
    });
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
    });
};
// Функция установки окончания существительного в зависимости от числительного
function numWord(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20)
        return words[2];
    if (num > 1 && num < 5)
        return words[1];
    if (num == 1)
        return words[0];
    return words[2];
}
// interface INumeralAndNoun {
//     numeral: number;
//     noun: string;
// }
// const setEndingDependingOnNumeral = function (params: INumeralAndNoun) {
// const { noun, numeral } = params;
// if (numeral === 0) {
//     return 'Сколько ' + noun + 'ей';
// } else if (numeral === 1) {
//     return numeral + ' ' + noun + 'ь';
// } else
//     if ((numeral > 1) && (numeral < 5)) {
//         return numeral + ' ' + noun + 'я';
//     } else
//         if ((!(numeral === 11)) && (((numeral - 1) % 10) === 0)) {
//             return numeral + ' ' + noun + 'ь';
//         } else
//             if ((!(numeral === 12)) && (((numeral - 2) % 10) === 0)) {
//                 return numeral + ' ' + noun + 'я';
//             } else
//                 if ((!(numeral === 13)) && (((numeral - 3) % 10) === 0)) {
//                     return numeral + ' ' + noun + 'я';
//                 } else
//                     if ((!(numeral === 14)) && (((numeral - 4) % 10) === 0)) {
//                         return numeral + ' ' + noun + 'я';
//                     } else {
//                         return numeral + ' ' + noun + 'ей';
//                     };
//};
// Выборка всех .dropdown и обработка каждого
document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
    var classDropdownInput = 'dropdown__input';
    var classButtonInc = 'dropdown__button-inc';
    var classButtonDec = 'dropdown__button-dec';
    var classValue = 'dropdown__value';
    var classButtonDecInactive = 'dropdown__button-dec_inactive';
    var classButtonActive = 'dropdown__button_active';
    var classButtonListOpnened = 'dropdown__button_listopened';
    var classListVisible = 'dropdown__list_visible';
    var classApplyButton = 'dropdown__button-apply';
    var classClearButton = 'dropdown__button-clear';
    var classClearButtonInactive = 'dropdown__button-clear_inactive';
    var classButtonsContainerInactive = 'dropdown__buttons-container_inactive';
    var dropdownInputs = dropdownWrapper.querySelectorAll('.dropdown__input');
    var dropdownButton = dropdownWrapper.querySelector('.dropdown__button');
    var dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    var dropdownInput1 = (dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='1']"));
    var dropdownInput2 = dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='2']");
    var dropdownInput3 = dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='3']");
    var dropdownItem1 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='1']");
    var dropdownItem2 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='2']");
    var dropdownItem3 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='3']");
    var dropdownClearButton = dropdownWrapper.querySelector("." + classClearButton);
    var dropdownButtonsContainer = dropdownWrapper.querySelector('.dropdown__buttons-container');
    //dropdownItem1.querySelector('.' + classValue).innerHTML = String(val1);
    //dropdownItem2.querySelector('.' + classValue).innerHTML = String(val2);
    //dropdownItem3.querySelector('.' + classValue).innerHTML = String(val3);
    // Проверяем успешность селекторов
    if (!(dropdownItem1
        && dropdownItem2
        && dropdownItem3
        && dropdownList
        && dropdownInput1
        && dropdownInput2
        && dropdownInput3
        && dropdownButton
        && dropdownClearButton
        && dropdownButtonsContainer))
        return; // Если undefined - прервать выполнение функции
    var dropdownValue1 = dropdownItem1.querySelector('.' + classValue);
    var dropdownValue2 = dropdownItem2.querySelector('.' + classValue);
    var dropdownValue3 = dropdownItem3.querySelector('.' + classValue);
    var buttonDec1 = dropdownItem1.querySelector('.' + classButtonDec);
    var buttonDec2 = dropdownItem2.querySelector('.' + classButtonDec);
    var buttonDec3 = dropdownItem3.querySelector('.' + classButtonDec);
    // Проверяем успешность селекторов
    if (!(dropdownValue1
        && dropdownValue2
        && dropdownValue3
        && buttonDec1
        && buttonDec2
        && buttonDec3))
        return; // Если undefined - прервать выполнение функции
    // Проверяем наличие свойств
    if (!(("value" in dropdownInput1)
        && ("value" in dropdownInput2)
        && ("value" in dropdownInput3)))
        return; // Если undefined - прервать выполнение функции
    // Запоминаем заголовок по умолчанию
    var placeholder = dropdownButton.innerHTML;
    console.log(buttonDec1, buttonDec2, buttonDec3);
    // Вызов функции назначения обработчиков для открытия и закрытия списка
    dropdownOpenAndCloseActions({
        buttonElement: dropdownButton,
        listElement: dropdownList,
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
        var target = (e.target); // где был клик? (!!!!!)
        if (!target)
            return; // Если undefined - прервать выполнение функции
        //Если click сработало на classButtonInc или classButtonDec
        if ((target.classList.contains(classButtonInc)) || (target.classList.contains(classButtonDec))) {
            // Определяем родитея, потомком которого является нажатая кнопка, получаем data-id
            var currItem = (target.parentNode);
            if (!currItem || !currItem.dataset)
                return;
            var currItemDataId = currItem.dataset.id;
            // Находим Inpit с таким же data-id
            var currInput = dropdownWrapper.querySelector("." + classDropdownInput + "[data-id='" + currItemDataId + "']");
            if (!currInput)
                return;
            // Запоминаем старое значение
            if (!("value" in currInput))
                return;
            var oldValue = Number(currInput.value);
            // определяем тип операции
            var increment = 0;
            if (target.classList.contains(classButtonInc)) {
                increment = 1;
            }
            else {
                increment = -1;
            }
            // определяем новое значение
            var newValue = oldValue + increment;
            // Изменяем значение, если новое значение >= 0
            if (newValue >= 0) {
                // Изменяем значение, записанное в Input.value
                currInput.value = newValue;
                //Если тип дропдауна = 1 и количество взрослых <= 1, а количество детей и младенцев больше 0
                // то устанавливаем количество взрослых на 1
                var dropdownType = 1; //Тип по умолчанию
                if (dropdownWrapper.dataset) { //Если у dropdownWrapper есть аттрибут dataset
                    if (dropdownWrapper.dataset.type === '2') {
                        dropdownType = 2;
                    }
                }
                if ((dropdownType === 1) && (Number(dropdownInput1.value) <= 1)) {
                    // Если есть дети / младенцы
                    if ((Number(dropdownInput2.value) + Number(dropdownInput3.value)) > 0) {
                        //добавляем 1 взрослого
                        dropdownInput1.value = '1';
                    }
                }
                // ********* Отображение значений dropdownInput ***************
                var val1 = Number(dropdownInput1.value);
                var val2 = Number(dropdownInput2.value);
                var val3 = Number(dropdownInput3.value);
                dropdownValue1.innerHTML = String(val1);
                dropdownValue2.innerHTML = String(val2);
                dropdownValue3.innerHTML = String(val3);
                // ********** Управление активностью кнопок "-" ***************
                // Кнопка 1
                if ((val1 === 0) || ((dropdownType === 1) && ((val1 === 1) && ((val2 + val3) > 0)))) {
                    buttonDec1.classList.add(classButtonDecInactive);
                }
                else {
                    buttonDec1.classList.remove(classButtonDecInactive);
                }
                ;
                // Кнопка 2
                if (val2 === 0) {
                    buttonDec2.classList.add(classButtonDecInactive);
                }
                else {
                    buttonDec2.classList.remove(classButtonDecInactive);
                }
                ;
                // Кнопка 3
                if (val3 === 0) {
                    buttonDec3.classList.add(classButtonDecInactive);
                }
                else {
                    buttonDec3.classList.remove(classButtonDecInactive);
                }
                ;
                // Кнопка "Очистить"
                if ((val1 === 0) && (val2 === 0) && (val3 === 0)) {
                    dropdownClearButton.classList.add(classClearButtonInactive);
                }
                else {
                    dropdownClearButton.classList.remove(classClearButtonInactive);
                }
                ;
                console.log(val1, val2, val3);
                // ************* Формируем заголовок на кнопке *************
                var sum = val1 + val2 + val3;
                if (dropdownType === 1) {
                    if (sum === 0) {
                        dropdownButton.innerHTML = placeholder;
                    }
                    else {
                        dropdownButton.innerHTML = String(sum) + ' ' + numWord(sum, ["гость", "гостя", "гостей"]);
                    }
                }
                else {
                    if (sum === 0) {
                        dropdownButton.innerHTML = placeholder;
                    }
                    else {
                        var caption = '';
                        if (val1 > 0) {
                            if (caption !== '') {
                                caption = caption + ', ';
                            }
                            ;
                            caption = caption + String(val1) + ' ' + numWord(val1, ["спальня", "спальни", "спален"]);
                        }
                        if (val2 > 0) {
                            if (caption !== '') {
                                caption = caption + ', ';
                            }
                            ;
                            caption = caption + String(val2) + ' ' + numWord(val2, ["кровать", "кровати", "кроватей"]);
                        }
                        if (val3 > 0) {
                            if (caption !== '') {
                                caption = caption + ', ';
                            }
                            ;
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
            dropdownInput1.value = '0';
            dropdownInput2.value = '0';
            dropdownInput3.value = '0';
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
        dropdownButton.focus();
    });
});
