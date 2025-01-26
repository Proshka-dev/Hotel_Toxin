// Функция по назначению обработчиков событий на открытие и закрытие списка
const dropdownOpenAndCloseActions = function (
    buttonElement, listElement, buttonListOpnenedClass, buttonActiveClass, listVisibleClass) {

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
const setEndingDependingOnNumeral = function (numeral, noun) {
    if (numeral === 0) {
        return 'Сколько ' + noun + 'ей';
    } else if (numeral === 1) {
        return numeral + ' ' + noun + 'ь';
    } else
        if ((numeral > 1) && (numeral < 5)) {
            return numeral + ' ' + noun + 'я';
        } else
            if ((!(numeral === 11)) && (((numeral - 1) % 10) === 0)) {
                return numeral + ' ' + noun + 'ь';
            } else
                if ((!(numeral === 12)) && (((numeral - 2) % 10) === 0)) {
                    return numeral + ' ' + noun + 'я';
                } else
                    if ((!(numeral === 13)) && (((numeral - 3) % 10) === 0)) {
                        return numeral + ' ' + noun + 'я';
                    } else
                        if ((!(numeral === 14)) && (((numeral - 4) % 10) === 0)) {
                            return numeral + ' ' + noun + 'я';
                        } else {
                            return numeral + ' ' + noun + 'ей';
                        };

};


// Выборка всех .dropdown и обработка каждого
document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
    const classDropdownInput = 'dropdown__input';
    const classButtonInc = 'dropdown__button-inc';
    const classButtonDec = 'dropdown__button-dec';
    const classValue = 'dropdown__value';
    const classButtonDecInactive = 'dropdown__button-dec_inactive';

    const dropdownInputs = dropdownWrapper.querySelectorAll('.dropdown__input');
    const dropdownButton = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    const dropdownInput1 = dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='1']");
    const dropdownInput2 = dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='2']");
    const dropdownInput3 = dropdownWrapper.querySelector("." + 'dropdown__input' + "[data-id='3']");

    const dropdownItem1 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='1']");
    const dropdownItem2 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='2']");
    const dropdownItem3 = dropdownWrapper.querySelector("." + 'dropdown__item' + "[data-id='3']");

    const buttonDec1 = dropdownItem1.querySelector('.' + classButtonDec);
    const buttonDec2 = dropdownItem2.querySelector('.' + classButtonDec);
    const buttonDec3 = dropdownItem3.querySelector('.' + classButtonDec);

    console.log(buttonDec1, buttonDec2, buttonDec3);


    dropdownOpenAndCloseActions(
        dropdownButton,
        dropdownList,
        'dropdown__button_listopened',
        'dropdown__button_active',
        'dropdown__list_visible'
    );

    // Событие Click на выпадающем списке
    dropdownList.addEventListener('click', function (e) {
        let target = e.target; // где был клик?

        //Если click сработало на classButtonInc или classButtonDec
        if ((target.classList.contains(classButtonInc)) || (target.classList.contains(classButtonDec))) {

            // Определяем родитея, потомком которого является нажатая кнопка, получаем data-id
            const currItem = target.parentNode;
            const currItemDataId = currItem.dataset.id;

            // Находим Inpit с таким же data-id
            const currInput = dropdownWrapper.querySelector("." + classDropdownInput + "[data-id='" + currItemDataId + "']");

            // Запоминаем старое значение
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

                //Если количество взрослых <= 1, а количество детей и младенцев больше 0
                // то устанавливаем количество взрослых на 1
                if (Number(dropdownInput1.value) <= 1) {
                    // Если есть дети / младенцы
                    if ((Number(dropdownInput2.value) + Number(dropdownInput3.value)) > 0) {
                        //добавляем 1 взрослого
                        dropdownInput1.value = '1';
                    }
                }

                // ********* Отображение значений dropdownInput ***************
                const val1 = Number(dropdownInput1.value);
                const val2 = Number(dropdownInput2.value);
                const val3 = Number(dropdownInput3.value);
                dropdownItem1.querySelector('.' + classValue).innerHTML = val1;
                dropdownItem2.querySelector('.' + classValue).innerHTML = val2;
                dropdownItem3.querySelector('.' + classValue).innerHTML = val3;

                // ********** Управление активностью кнопок "-" ***************
                // Кнопка 1
                if ((val1 === 0) || ((val1 === 1) && ((val2 + val3) > 0))) {
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

                console.log(val1, val2, val3);

                // ************* Формируем заголовок на кнопке *************
                let sum = 0;
                dropdownInputs.forEach(function (dropdownInput) {
                    sum = sum + Number(dropdownInput.value);
                });
                // Функцией определяем окончание существительного в зависимости от числительного, устанавливаем заголовок
                dropdownButton.innerHTML = setEndingDependingOnNumeral(sum, 'гост');
            }
        }









        //останавливаем всплытие
        e.stopPropagation();

        //оставляем фокус на кнопке
        dropdownButton.focus();
    })

});