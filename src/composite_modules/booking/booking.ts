// Функция заполнения карточки данными
// *************************************************************
// ***************** Фукнция рендера продуктов *****************
// *************************************************************
interface IRenderProducts {
    products: { id: string; name: string; }[];
    container: HTMLElement;
    textContainer: HTMLElement;
    numberProductsOnPage: number;
    page: number
};
const renderProducts = ({ products, container, textContainer, numberProductsOnPage, page }: IRenderProducts) => {
    container.innerHTML = '';

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


    productsOnPage.forEach(({ id, name }) => {
        const li = document.createElement('li');
        li.classList.add('products-list__item');
        li.innerHTML = `
                <div class='products-list__id'>
                    ${id}
                </div>
                <div class='products-list__name'>
                    ${name}
                </div >
                `;
        container.append(li);

        console.log('Product li: ', li);
    });

    /** Обновляем текстовую часть  */
    textContainer.innerText = renderText({
        firstNumber: firstProductIndex + 1,
        lastNumber: lastProductIndex,
        totalQuantity: products.length
    });
};

// *************************************************************
// ****************** Фукнция рендера текста *******************
// *************************************************************
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

// *************************************************************
// ***************** Фукнция рендера пагинации *****************
// *************************************************************
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

// *************************************************************
// **************** Фукнция рендера группы кнопок **************
// *************************************************************
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

// *************************************************************
// ****************** Фукнция рендера кнопки *******************
// *************************************************************
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

// *************************************************************
// *********** Фукнция обработки кликов по пагинации ***********
// *************************************************************
interface IEventListenerPaginationClicks {
    paginationWrapper: HTMLElement;
    products: { id: string; name: string; }[];
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


// ********************************************************************************************
// *******************************  Основная часть  *******************************************
// ********************************************************************************************
interface IBookingParams {
    number: string;
    type: string;
    price: number;
    discountChild: number;
    discountBaby: number;
    serviceFee: number;
    serviceFeeDiscount: number;
    additionalServiceFee: number;
};

const bookingUpdateCard = (bookingParams: IBookingParams) => {

    const bookingWrapper = document.querySelector('.booking') as HTMLElement;
    const bookingElementNumber = bookingWrapper.querySelector('.booking__number') as HTMLElement;
    const bookingElementType = bookingWrapper.querySelector('.booking__type') as HTMLElement;
    const bookingElementPrice = bookingWrapper.querySelector('.booking__price') as HTMLElement;
    const bookingElementPeriod = bookingWrapper.querySelector('.booking__period') as HTMLElement;
    const bookingElementPeriodPrice = bookingWrapper.querySelector('.booking__period-price') as HTMLElement;
    const bookingElementFee = bookingWrapper.querySelector('.booking__fee') as HTMLElement;
    const bookingElementFeeInfo = bookingWrapper.querySelector('.booking__fee-info') as HTMLElement;
    const bookingElementFeePrice = bookingWrapper.querySelector('.booking__fee-price') as HTMLElement;
    const bookingElementAddfee = bookingWrapper.querySelector('.booking__addfee') as HTMLElement;
    const bookingElementAddfeeInfo = bookingWrapper.querySelector('.booking__addfee-info') as HTMLElement;
    const bookingElementAddfeePrice = bookingWrapper.querySelector('.booking__addfee-price') as HTMLElement;
    const bookingElementTotalPrice = bookingWrapper.querySelector('.booking__total-price') as HTMLElement;

    // Объект для более удобного доступа к элементам
    const elem = {
        wrapper: bookingWrapper,
        number: bookingElementNumber,
        type: bookingElementType,
        price: bookingElementPrice,
        period: bookingElementPeriod,
        periodPrice: bookingElementPeriodPrice,
        fee: bookingElementFee,
        feeInfo: bookingElementFeeInfo,
        feePrice: bookingElementFeePrice,
        addFee: bookingElementAddfee,
        addFeeInfo: bookingElementAddfeeInfo,
        addFeePrice: bookingElementAddfeePrice,
        totalPrice: bookingElementTotalPrice,
    };

};

export {
    bookingUpdateCard
};
