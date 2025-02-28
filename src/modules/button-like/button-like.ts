// *****************************************************************************
// *****************************************************************************
const buttonLikeActivate = () => {
    /** Выборка всех.button - like и обработка каждого */
    document.querySelectorAll('.button-like').forEach(function (buttonLike: HTMLElement) {
        buttonLike.addEventListener('click', function () {
            let value = Number(buttonLike.dataset.value);
            if (buttonLike.classList.contains('button-like_active')) {
                // Если была активна
                value = value - 1;
            } else {
                // Если была неактивна    
                value = value + 1;
            };

            // Изменяем значение data-value
            buttonLike.dataset.value = String(value);
            // Изменяем отображаемый текст
            buttonLike.querySelector('.button-like__text').innerHTML = String(value);
            // Переключаем класс button-like_active
            buttonLike.classList.toggle('button-like_active');

        });
    });
};

export { buttonLikeActivate }