// *********************************************************************************
//                              Функции
// *********************************************************************************
const setWidthDependingOnContent = (buttonLike: HTMLElement) => {
	const textElement = buttonLike.querySelector('.button-like__text') as HTMLElement;
	if (!textElement) return;
	let numOfSimbols = textElement.innerText.length;

	if (!buttonLike.classList.contains('button-like_active')) {
		const numOfSimbolsNext = String(Number(textElement.innerText) + 1).length;
		if (numOfSimbolsNext > numOfSimbols) {
			numOfSimbols = numOfSimbols + 1;
		}
	}

	if (numOfSimbols > 2) {
		textElement.style.minWidth = String(13.4 + (numOfSimbols - 2) * 6.63) + 'px';
	};
};

// *********************************************************************************
//                              Основная часть
// *********************************************************************************
const buttonLikeActivate = () => {
	/** Выборка всех.button - like и обработка каждого */
	document.querySelectorAll('.button-like').forEach(function (buttonLike: HTMLElement) {
		/** Обработчик события click */
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

		/** Установка ширины блока с подстройкой под содержимое */
		setWidthDependingOnContent(buttonLike);

	});
};

// *********************************************************************************
//                              Экспорт
// *********************************************************************************
export { buttonLikeActivate }