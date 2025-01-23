document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
    const dropdownInput = dropdownWrapper.querySelector('.dropdown__input');
    const dropdownButton = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    const dropdownItems = dropdownWrapper.querySelectorAll('.dropdown__item');

    dropdownButton.addEventListener('click', function () {
        dropdownList.classList.toggle('dropdown__list_visible');
        //добавляем/убираем кнопке атрибут, по которому менняется стрелка
        dropdownButton.classList.toggle('dropdown__button_listopened');
        //добавляем визуальный эффект, аналогичный фокусу на кнопке
        dropdownButton.classList.add('dropdown__button_active');
    });

    //переделать на 1 событие на список с определением потомка
    dropdownItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
            //останавливаем всплытие
            e.stopPropagation();
            //меняем текст на кнопке на выбранный нами
            dropdownButton.innerHTML = this.innerHTML;
            //оставляем фокус на кнопке
            dropdownButton.focus();
            //меняем значение input на значение, указнное в data-value списка
            dropdownInput.value = this.dataset.value;
            //скрываем списпок
            dropdownList.classList.remove('dropdown__list_visible');
            //убираем кнопке атрибут, по которому менняется стрелка
            dropdownButton.classList.remove('dropdown__button_listopened');
        })
    });

    //скрываем по клику снаружи кнопки
    document.addEventListener('click', function (e) {
        if (e.target !== dropdownButton) {
            //снимаем визуальное отображение фокуса
            dropdownButton.classList.remove('dropdown__button_active');
            //скрываем список
            dropdownList.classList.remove('dropdown__list_visible');
            //убираем кнопке атрибут, по которому менняется стрелка
            dropdownButton.classList.remove('dropdown__button_listopened');
        }
    })

    //скрываем нажатию на Tab или Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            //снимаем визуальное отображение фокуса
            dropdownButton.classList.remove('dropdown__button_active');
            //скрываем список
            dropdownList.classList.remove('dropdown__list_visible');
            //убираем кнопке атрибут, по которому менняется стрелка
            dropdownButton.classList.remove('dropdown__button_listopened');
        }
    })
});