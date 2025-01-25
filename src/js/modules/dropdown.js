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
        buttonElement.classList.add(buttonActive);
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

// Выборка всех .dropdown и обработка каждого
document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
    const dropdownInputs = dropdownWrapper.querySelectorAll('.dropdown__input');
    const dropdownButton = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');

    dropdownOpenAndCloseActions(
        dropdownButton,
        dropdownList,
        'dropdown__button_listopened',
        'dropdown__button_active',
        'dropdown__list_visible'
    );
    // // Событие Click на кнопке
    // // (отображаем список, управляем стрелкой, управляем визуальными эффектами кнопки)
    // dropdownButton.addEventListener('click', function () {
    //     //отображаем список
    //     dropdownList.classList.toggle('dropdown__list_visible');

    //     //добавляем/убираем кнопке атрибут, по которому меняется стрелка
    //     dropdownButton.classList.toggle('dropdown__button_listopened');

    //     //добавляем визуальный эффект, аналогичный фокусу на кнопке
    //     dropdownButton.classList.add('dropdown__button_active');
    // });

    // Событие Click на выпадающем списке
    dropdownList.addEventListener('click', function (e) {
        let target = e.target; // где был клик?

        //Если click сработало на dropdown__button-inc или dropdown__button-dec
        if ((target.classList.contains('dropdown__button-inc')) || (target.classList.contains('dropdown__button-dec'))) {
            // определяем тип операции
            let increment = 0;
            if (target.classList.contains('dropdown__button-inc')) {
                increment = 1;
            } else {
                increment = -1;
            }

            // У родителя (.dropdown__item) увеличиваем значение атрибута data-value, если новое значение >= 0
            const currItem = target.parentNode;
            if ((Number(currItem.dataset.value) + increment) >= 0) {
                if ((Number(currItem.dataset.value) === 1) && (increment === -1)) {
                    //делаем неактивной кнопку "-"
                    currItem.querySelector('.dropdown__button-dec').classList.add('dropdown__button-dec_inactive');
                } else {
                    if ((Number(currItem.dataset.value) === 0) && (increment === 1)) {
                        //делаем активной кнопку "-"
                        currItem.querySelector('.dropdown__button-dec').classList.remove('dropdown__button-dec_inactive');
                    };
                };

                currItem.dataset.value = Number(currItem.dataset.value) + increment;

                // Изменяем значение, записанное в Input.value
                const currItemDataId = currItem.dataset.id;
                const currInput = dropdownWrapper.querySelector(".dropdown__input[data-id='" + currItemDataId + "']");
                currInput.value = currItem.dataset.value;

                // Отображаем значение в элементе .dropdown__value
                currItem.querySelector('.dropdown__value').innerHTML = currItem.dataset.value;

                // Формируем заголовок .dropdown__button
                let sum = 0;
                dropdownInputs.forEach(function (dropdownInput) {
                    sum = sum + Number(dropdownInput.value);
                });

                // устанавливаем окончание в зивисимости от числительного
                if (sum === 0) {
                    dropdownButton.innerHTML = 'Сколько гостей';
                } else if (sum === 1) {
                    dropdownButton.innerHTML = sum + ' гость';
                } else
                    if ((sum > 1) && (sum < 5)) {
                        dropdownButton.innerHTML = sum + ' гостя';
                    } else
                        if ((!(sum === 11)) && (((sum - 1) % 10) === 0)) {
                            dropdownButton.innerHTML = sum + ' гость';
                        } else
                            if ((!(sum === 12)) && (((sum - 2) % 10) === 0)) {
                                dropdownButton.innerHTML = sum + ' гостя';
                            } else
                                if ((!(sum === 13)) && (((sum - 3) % 10) === 0)) {
                                    dropdownButton.innerHTML = sum + ' гостя';
                                } else
                                    if ((!(sum === 14)) && (((sum - 4) % 10) === 0)) {
                                        dropdownButton.innerHTML = sum + ' гостя';
                                    } else {
                                        dropdownButton.innerHTML = sum + ' гостей';
                                    };

            }
        }

        //останавливаем всплытие
        e.stopPropagation();

        //оставляем фокус на кнопке
        dropdownButton.focus();
    })

    // //скрываем по клику снаружи кнопки
    // document.addEventListener('click', function (e) {
    //     if (e.target !== dropdownButton) {
    //         //снимаем визуальное отображение фокуса
    //         dropdownButton.classList.remove('dropdown__button_active');
    //         //скрываем список
    //         dropdownList.classList.remove('dropdown__list_visible');
    //         //убираем кнопке атрибут, по которому менняется стрелка
    //         dropdownButton.classList.remove('dropdown__button_listopened');
    //     }
    // })

    // //скрываем нажатию на Tab или Escape
    // document.addEventListener('keydown', function (e) {
    //     if (e.key === 'Tab' || e.key === 'Escape') {
    //         //снимаем визуальное отображение фокуса
    //         dropdownButton.classList.remove('dropdown__button_active');
    //         //скрываем список
    //         dropdownList.classList.remove('dropdown__list_visible');
    //         //убираем кнопке атрибут, по которому менняется стрелка
    //         dropdownButton.classList.remove('dropdown__button_listopened');
    //     }
    // })


});