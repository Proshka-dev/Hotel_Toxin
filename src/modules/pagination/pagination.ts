// *********************************************************************************
//                              Интерфейсы
// *********************************************************************************
interface IProduct {
	number: string;
	type: string;
	rating: number;
	reviews: number;
	rules: { smoke: boolean; pets: boolean; manyguests: boolean };
	accessibility: { wideCorridor: boolean; disabledAssistant: boolean };
	amenities: {
		bedrooms: number;
		beds: number;
		bathrooms: number;
		breakfast: boolean;
		desk: boolean;
		highChair: boolean;
		crib: boolean;
		tv: boolean;
		shampoo: boolean;
	};
	images: string[];
}

// *********************************************************************************
//                              Функции
// *********************************************************************************
/** Функция рендера продуктов */
interface IRenderProducts {
	products: IProduct[];
	container: HTMLElement;
	textContainer: HTMLElement;
	numberProductsOnPage: number;
	page: number
};
const renderProducts = ({ products, container, textContainer, numberProductsOnPage, page }: IRenderProducts) => {
	//container.innerHTML = '';

	const firstProductIndex = numberProductsOnPage * page - numberProductsOnPage;

	let lastProductIndex;

	if ((firstProductIndex + numberProductsOnPage) < products.length) {
		lastProductIndex = firstProductIndex + numberProductsOnPage;
	} else {
		lastProductIndex = products.length;
	};

	/** вырезаем нужную часть массива */
	const productsOnPage = products.slice(firstProductIndex, lastProductIndex);
	console.log('productsOnPage: ', productsOnPage);


	/** ВСТАВИТЬ!!!!! 
	 *  
	 * Функция заполнения данными карточки товара
	 * 
	 * */

	productsOnPage.forEach(({ number, type }) => {
		const li = document.createElement('li');
		li.classList.add('products-list__item');

		/** Заполнение карточки товара */
		li.innerHTML = `
				<div class='products-list__id'>
					${number}
				</div>
				<div class='products-list__name'>
					${type}
				</div >
				`;
		/*******************************/
		// container.append(li);

		// Функция рендера списка, добавляющая/удаляющая элементы
		renderList({ listElement: container, numberItems: lastProductIndex - firstProductIndex });


		console.log('Product li: ', li);
	});

	/** Обновляем текстовую часть  */
	textContainer.innerText = renderText({
		firstNumber: firstProductIndex + 1,
		lastNumber: lastProductIndex,
		totalQuantity: products.length
	});
};

/** Функция рендера текста */
interface IRenderText {
	firstNumber: number;
	lastNumber: number;
	totalQuantity: number;
};
const renderText = ({ firstNumber, lastNumber, totalQuantity }: IRenderText): string => {

	let resultString = String(firstNumber) + ' – ' + String(lastNumber) + ' из ';
	if (totalQuantity <= 100) {
		resultString = resultString + String(totalQuantity)
	} else {
		resultString = resultString + String(Math.floor(totalQuantity / 100) * 100) + '+';
	};

	if (((totalQuantity === 1) || (totalQuantity % 10 === 1)) && (totalQuantity < 100)) {
		resultString = resultString + ' варианта аренды'
	} else {
		resultString = resultString + ' вариантов аренды'
	};

	return resultString;
};

/** Функция рендера пагинации */
interface IRenderPagination {
	totalProducts: number;
	numberProductsOnPage: number;
	currPage: number;
};
const renderPagination = ({ totalProducts, numberProductsOnPage, currPage }: IRenderPagination) => {

	/** Рассчитываем общее количество страниц */
	const pagesCount = Math.ceil(totalProducts / numberProductsOnPage);

	/** Ищем элемент (ul), содержащий в себе элементы - кнопки (li) */
	const ul = document.querySelector('.pagination__list');

	/** Обнуляем внутреннее содержимое ul */
	ul.innerHTML = '';


	if (pagesCount <= 5) {
		/** Обычный рендер без троеточия */
		for (let i = 1; i <= pagesCount; i++) {
			const li = renderBtn({ page: i, currPage: currPage });
			ul.append(li);
		}

	} else {
		/** Рендер с троеточием. Будет в 3 этапа: до текущей страницы, текущая и после текущей */
		// *** рендер до текущей ***
		renderBtnGroup({
			ul: ul,
			firtPage: 1,
			lastPage: currPage - 1,
			currPage: currPage
		});
		// *** рендер текущей ***
		renderBtnGroup({
			ul: ul,
			firtPage: currPage,
			lastPage: currPage,
			currPage: currPage
		});
		// *** рендер после текущей ***
		renderBtnGroup({
			ul: ul,
			firtPage: currPage + 1,
			lastPage: pagesCount,
			currPage: currPage
		});
	}

	/** Обработка стиля активной/неактивной стрелки */
	const arrowElement = document.querySelector('.pagination__arrow');
	if (currPage < pagesCount) {
		arrowElement.classList.remove('pagination__arrow_unactive');
	} else {
		arrowElement.classList.add('pagination__arrow_unactive');
	};


};

/** Функция рендера группы кнопок */
interface IRenderBtnGroup {
	ul: Element;
	firtPage: number;
	lastPage: number;
	currPage: number;
};
const renderBtnGroup = ({ ul, firtPage, lastPage, currPage }: IRenderBtnGroup) => {

	if ((lastPage - firtPage) < 3) {
		for (let i = firtPage; i <= lastPage; i++) {
			const li = renderBtn({ page: i, currPage: currPage });
			ul.append(li);
		}
	} else {
		// Рендер с троеточием
		// Первая кнопка
		ul.append(renderBtn({ page: firtPage, currPage: currPage }));
		// троеточие
		const li = document.createElement('li');
		li.classList.add('pagination__item');
		li.classList.add('pagination__item_unclickable');
		li.textContent = '...';
		ul.append(li);
		// Последняя кнопка
		ul.append(renderBtn({ page: lastPage, currPage: currPage }));
	};
};

/** Функция рендера кнопки */
interface IRenderBtn {
	page: number;
	currPage: number;
};
const renderBtn = ({ page, currPage }: IRenderBtn) => {

	const li = document.createElement('li');
	li.classList.add('pagination__item');
	li.textContent = String(page);

	if (currPage === page) {
		li.classList.add('pagination__item_active');
	}
	return li;
};

/** Функция обработки кликов по пагинации */
interface IEventListenerPaginationClicks {
	paginationWrapper: HTMLElement;
	products: IProduct[];
	currentPage: number;
	productContainer: HTMLElement;
	paginationText: HTMLElement;
	quantityProductsOnPage: number;
	totalPages: number;
};
const eventListenerPaginationClicks = ({ paginationWrapper, products, currentPage, productContainer, paginationText, quantityProductsOnPage, totalPages }: IEventListenerPaginationClicks) => {
	// На контейнер пагинации вешаем обработчик кликов
	paginationWrapper.addEventListener('click', (event: Event) => {
		// получаем цель клика
		const eventTarget = event.target as HTMLElement;
		// Проверяем нет ли у цели клика родителя с классом pagination__item
		if (eventTarget.closest('.pagination__item')) {
			// Если в содержимом нет трех точек
			if (eventTarget.textContent !== '...') {
				// меняем значение переменной currentPage на то, что содержится в тексте контейнера
				currentPage = Number(eventTarget.textContent);
				// запускаем рендер продуктов
				renderProducts({
					products: products,
					container: productContainer,
					textContainer: paginationText,
					numberProductsOnPage: quantityProductsOnPage,
					page: currentPage
				});
				// запускаем рендер пагинации
				renderPagination({
					totalProducts: products.length,
					numberProductsOnPage: quantityProductsOnPage,
					currPage: currentPage
				});
			}
		} else {
			// Если кликнули на стрелку и еще не достигли максимумальной страницы
			if ((eventTarget.closest('.pagination__arrow')) && (currentPage < totalPages)) {
				// меняем значение переменной currentPage на то, что содержится в тексте контейнера
				currentPage = currentPage + 1;
				// запускаем рендер продуктов
				renderProducts({
					products: products,
					container: productContainer,
					textContainer: paginationText,
					numberProductsOnPage: quantityProductsOnPage,
					page: currentPage
				});
				// запускаем рендер пагинации
				renderPagination({
					totalProducts: products.length,
					numberProductsOnPage: quantityProductsOnPage,
					currPage: currentPage
				});
			}
		};
	});
};

/** Функция отрисовки карточек 
 * 
 *  Если число карточек в элементе listElement не совпадает
 *  с numberItems, то добавляет или убирает карточеки
*/
interface IRenderListParams {
	listElement: HTMLElement; // Элемент, содержащий карточки товаров
	numberItems: number; // Требуемое количество карточек
};
const renderList = ({ listElement, numberItems }: IRenderListParams) => {
	/** Определяем количество элементов списка */
	const currNumberItems = listElement.children.length;

	if (currNumberItems === numberItems) { return }; // уже нужно количество элементов - изменения в структуре не нужны

	// Если элементов мало - добавляем
	if (currNumberItems < numberItems) {
		for (let index = currNumberItems; index < numberItems; index++) {
			// добавляем элемент li
			const li = document.createElement('li');
			li.classList.add('main__item'); //назначение класса элементу

			/** Заполнение карточки товара */
			li.innerHTML = `
				<div class="product">
					<div class="product__slider-container">
						<div class="product__slider">
							<section class="splide">
								<div class="splide__track">
									<ul class="splide__list">
										<li class="splide__slide"><img class="product__image" src="img/rooms/room01-1.jpg" alt=""/></li>
										<li class="splide__slide"><img class="product__image" src="img/rooms/room01-2.jpg" alt=""/></li>
										<li class="splide__slide"><img class="product__image" src="img/rooms/room01-3.jpg" alt=""/></li>
										<li class="splide__slide"><img class="product__image" src="img/rooms/room01-4.jpg" alt=""/></li>
									</ul>
								</div>
							</section>
						</div>
					</div>
					<div class="product__body">
						<div class="product__info">
							<div class="product__number-container"><span>№ </span><span class="product__number">888</span></div>
							<div class="product__type">люкс</div>
							<div class="product__price-container"><span class="product__price">9 990₽</span><span> в сутки</span></div>
						</div>
						<div class="product__reviews">
							<div class="product__rating">
								<div class="button-rate">
									<input type="radio" id="starrate${index * 5 + 5}" name="starname${index}" value="5" disabled/>
									<label for="starrate${index * 5 + 5}" title="text">5 star</label>
									<input type="radio" id="starrate${index * 5 + 4}" name="starname${index}" value="4" disabled/>
									<label for="starrate${index * 5 + 4}" title="text">4 star</label>
									<input type="radio" id="starrate${index * 5 + 3}" name="starname${index}" value="3" disabled/>
									<label for="starrate${index * 5 + 3}" title="text">3 star</label>
									<input type="radio" id="starrate${index * 5 + 2}" name="starname${index}" value="2" disabled/>
									<label for="starrate${index * 5 + 2}" title="text">2 star</label>
									<input type="radio" id="starrate${index * 5 + 1}" name="starname${index}" value="1" disabled/>
									<label for="starrate${index * 5 + 1}" title="text">1 star</label>
								</div>
							</div>
							<div class="product__quantity-reviews">145</div>
							<div class="product__text">Отзывов</div>
						</div>
					</div>
				</div>
			`;
			/*******************************/
			listElement.append(li);
		};
		return; // Прерываем выполнение функции
	};

	// Если элементов много - удаляем лишние
	if (currNumberItems > numberItems) {
		for (let index = numberItems; index < currNumberItems; index++) {
			listElement.removeChild(listElement.lastElementChild);
		};
	};

};

/** Функция заполнения данными карточки товара */
const fillCardData = ({ product, cardItem }: { product: IProduct; cardItem: HTMLElement }) => {

	const images = cardItem.querySelectorAll('.product__image');
	const number = cardItem.querySelector('.product__number');
	const numberType = cardItem.querySelector('.product__type');
	const price = cardItem.querySelector('.product__price');
	const type = cardItem.querySelector('.product__type');
	const quantityReviews = cardItem.querySelector('.product__quantity-reviews');
	//const rating = cardItem.querySelector('.product__type');


};

// *********************************************************************************
//                              Основная часть
// *********************************************************************************
const paginate = (products: IProduct[]) => {
	let quantityProductsOnPage = 5;
	let currentPage = 1;
	const totalPages = Math.ceil(products.length / quantityProductsOnPage);

	//const productContainer = document.querySelector('.products-list__list') as HTMLElement;
	const productContainer = document.querySelector('.main__items') as HTMLElement;
	const paginationWrapper = document.querySelector('.pagination') as HTMLElement;
	const paginationText = document.querySelector('.pagination__text') as HTMLElement;

	/** 1 - Рендерим продукты */
	renderProducts({
		products,
		container: productContainer,
		textContainer: paginationText,
		numberProductsOnPage: quantityProductsOnPage,
		page: currentPage
	});

	/** 2 - Рендерим пагинацию */
	renderPagination({
		totalProducts: products.length,
		numberProductsOnPage: quantityProductsOnPage,
		currPage: currentPage
	});

	/** 3 - вешаем обработчик кликов по контейнеру пагинации */
	eventListenerPaginationClicks({
		paginationWrapper,
		products,
		currentPage,
		productContainer,
		paginationText,
		quantityProductsOnPage,
		totalPages
	});
};

// *********************************************************************************
//                              Экспорт
// *********************************************************************************
export { paginate };
