// *************************************************************
// ***************** Фукнция рендера продуктов *****************
// *************************************************************
const renderProducts = (products: { id: string; name: string; }[], container: HTMLElement, textContainer: HTMLElement, numberProductsOnPage: number, page: number) => {
    container.innerHTML = '';

    const firstProductIndex = numberProductsOnPage * page - numberProductsOnPage;

    let lastProductIndex;

    if ((firstProductIndex + numberProductsOnPage) < products.length) {
        lastProductIndex = firstProductIndex + numberProductsOnPage;
    } else {
        lastProductIndex = products.length;
    };

    //вырезаем нужную часть массива
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

    // Обновляем текстовую часть
    textContainer.innerText = renderText(firstProductIndex + 1, lastProductIndex, products.length);
};

// *************************************************************
// ****************** Фукнция рендера текста *******************
// *************************************************************
const renderText = (firstNumber: number, lastNumber: number, totalQuantity: number): string => {

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

    // Рассчитываем общее количество страниц
    const pagesCount = Math.ceil(totalProducts / numberProductsOnPage);

    // Ищем элемент (ul), содержащий в себе элементы - кнопки (li)
    const ul = document.querySelector('.pagination__list');

    // Обнуляем внутреннее содержимое ul
    ul.innerHTML = '';


    if (pagesCount <= 5) {
        // Обычный рендер без троеточия
        for (let i = 1; i <= pagesCount; i++) {
            const li = renderBtn(i, currPage);
            ul.append(li);
        }

    } else {
        // Рендер с троеточием. Будет в 3 этапа: до текущей страницы, текущая и после текущей
        // *** рендер до текущей ***
        renderBtnGroup(ul, 1, currPage - 1, currPage);
        // *** рендер текущей ***
        renderBtnGroup(ul, currPage, currPage, currPage);
        // *** рендер после текущей ***
        renderBtnGroup(ul, currPage + 1, pagesCount, currPage);
    }

    // *** Обработка стиля активной/неактивной стрелки ***
    const arrowElement = document.querySelector('.pagination__arrow'); // вынести за пределы функции
    if (currPage < pagesCount) {
        arrowElement.classList.remove('pagination__arrow_unactive');
    } else {
        arrowElement.classList.add('pagination__arrow_unactive');
    };


};

// *************************************************************
// **************** Фукнция рендера группы кнопок **************
// *************************************************************
const renderBtnGroup = (ul: Element, firtPage: number, lastPage: number, currPage: number) => {

    if ((lastPage - firtPage) < 3) {
        for (let i = firtPage; i <= lastPage; i++) {
            const li = renderBtn(i, currPage);
            ul.append(li);
        }
    } else {
        // Рендер с троеточием
        // Первая кнопка
        ul.append(renderBtn(firtPage, currPage));
        // троеточие
        const li = document.createElement('li');
        li.classList.add('pagination__item');
        li.classList.add('pagination__item_unclickable');
        li.textContent = '...';
        ul.append(li);
        // Последняя кнопка
        ul.append(renderBtn(lastPage, currPage));
    };
};

// *************************************************************
// ****************** Фукнция рендера кнопки *******************
// *************************************************************
const renderBtn = (page: number, currPage: number) => {

    const li = document.createElement('li');
    li.classList.add('pagination__item');
    li.textContent = String(page);

    if (currPage === page) {
        li.classList.add('pagination__item_active');
    }
    return li;
};


// ********************************************************************************************
// *******************************  Основная часть  *******************************************
// ********************************************************************************************
const paginate = (products: { id: string; name: string; }[]) => {
    console.log('products: ', products);

    let quantityProductsOnPage = 3;
    let currentPage = 1;
    const totalPages = Math.ceil(products.length / quantityProductsOnPage);

    const productContainer = document.querySelector('.products-list__list') as HTMLElement;
    const paginationWrapper = document.querySelector('.pagination') as HTMLElement;
    const paginationText = document.querySelector('.pagination__text') as HTMLElement;


    // *************************************************************
    // *********** Фукнция обработки кликов по пагинации ***********
    // *************************************************************
    const eventListenerPaginationClicks = () => {
        // На контейнер пагинации вешаем обработчик кликов
        paginationWrapper.addEventListener('click', (event) => {
            // получаем цель клика
            const eventTarget = event.target as HTMLElement;
            // Проверяем нет ли у цели клика родителя с классом pagination__item
            if (eventTarget.closest('.pagination__item')) {
                // Если в содержимом нет трех точек
                if (eventTarget.textContent !== '...') {
                    // меняем значение переменной currentPage на то, что содержится в тексте контейнера
                    currentPage = Number(eventTarget.textContent);
                    // запускаем рендер продуктов
                    renderProducts(products, productContainer, paginationText, quantityProductsOnPage, currentPage);
                    // запускаем рендер пагинации
                    renderPagination({ totalProducts: products.length, numberProductsOnPage: quantityProductsOnPage, currPage: currentPage });
                }
            } else {
                // Если кликнули на стрелку и еще не достигли максимумальной страницы
                if ((eventTarget.closest('.pagination__arrow')) && (currentPage < totalPages)) {
                    // меняем значение переменной currentPage на то, что содержится в тексте контейнера
                    currentPage = currentPage + 1;
                    // запускаем рендер продуктов
                    renderProducts(products, productContainer, paginationText, quantityProductsOnPage, currentPage);
                    // запускаем рендер пагинации
                    renderPagination({ totalProducts: products.length, numberProductsOnPage: quantityProductsOnPage, currPage: currentPage });

                }
            };

        });
    };

    // ******************** 1 - Рендерим продукты ********************
    renderProducts(products, productContainer, paginationText, quantityProductsOnPage, currentPage);

    // ******************* 2 - Рендерим пагинацию *******************
    renderPagination({ totalProducts: products.length, numberProductsOnPage: quantityProductsOnPage, currPage: currentPage });

    // **** 3 - вешаем обработчик кликов по контейнеру пагинации ****
    eventListenerPaginationClicks();

};

export {
    paginate
};
