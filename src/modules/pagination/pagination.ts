
const paginate = (products: { id: string; name: string; }[]) => {
    console.log('products: ', products);

    let quantityProductsOnPage = 3;
    let currentPage = 5;

    const productContainer = document.querySelector('.products-list__list') as HTMLElement;
    const pagination = document.querySelector('.pagination__list') as HTMLElement;
    // Кнопка 'назад' отсутствует
    //const btnPrevPagination = document.querySelector('.pagination__arrow-prev') as HTMLElement;
    const btnNextPagination = document.querySelector('.pagination__arrow') as HTMLElement;
    const paginationText = document.querySelector('.pagination__text') as HTMLElement;

    // *************************************************************
    // ***************** Фукнция рендера продуктов *****************
    // *************************************************************
    const renderProducts = (products: { id: string; name: string; }[], container: HTMLElement, numberProductsOnPage: number, page: number) => {
        productContainer.innerHTML = '';

        const firstProductIndex = numberProductsOnPage * page - numberProductsOnPage;
        console.log('firstProductIndex: ', firstProductIndex);

        let lastProductIndex;

        if ((firstProductIndex + numberProductsOnPage) < products.length) {
            lastProductIndex = firstProductIndex + numberProductsOnPage;
        } else {
            lastProductIndex = products.length;
        };
        console.log('lastProductIndex: ', lastProductIndex);

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
        paginationText.innerText = renderText(firstProductIndex + 1, lastProductIndex, products.length);


    };

    // *************************************************************
    // ***************** Фукнция рендера пагинации *****************
    // *************************************************************
    const renderPagination = (totalProducts: number, numberProductsOnPage: number, numberOfCurrentPage: number) => {

        // Рассчитываем общее количество страниц
        const pagesCount = Math.ceil(totalProducts / numberProductsOnPage);

        // Ищем элемент (ul), содержащий в себе элементы - кнопки (li)
        const ul = document.querySelector('.pagination__list');

        // Обнуляем внутреннее содержимое ul
        ul.innerHTML = '';


        if (pagesCount <= 5) {
            // Обычный рендер без троеточия
            for (let i = 1; i <= pagesCount; i++) {
                const li = renderBtn(i);
                ul.append(li);
            }

        } else {
            // Рендер с троеточием. Будет в 3 этапа: до текущей страницы, текущая и после текущей
            // *** рендер до текущей ***
            renderBtnGroup(ul, 1, numberOfCurrentPage - 1);
            // *** рендер текущей ***
            renderBtnGroup(ul, numberOfCurrentPage, numberOfCurrentPage);
            // *** рендер после текущей ***
            renderBtnGroup(ul, numberOfCurrentPage + 1, pagesCount);
        }



        // Старый рендер !!!!!!!!!!!!!!!!!!!!!!!!!
        // for (let i = 1; i <= pagesCount; i++) {
        //     const li = renderBtn(i);
        //     ul.append(li);
        // }
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        //pagination.classList.remove('hidden');
    };

    // *************************************************************
    // **************** Фукнция рендера группы кнопок **************
    // *************************************************************
    const renderBtnGroup = (ul: Element, firtPage: number, lastPage: number) => {

        if ((lastPage - firtPage) < 3) {
            for (let i = firtPage; i <= lastPage; i++) {
                const li = renderBtn(i);
                ul.append(li);
            }
        } else {
            // Рендер с троеточием
            // Первая кнопка
            ul.append(renderBtn(firtPage));
            // троеточие
            const li = document.createElement('li');
            li.classList.add('pagination__item');
            li.classList.add('pagination__item_unclickable');
            li.textContent = '...';
            ul.append(li);
            // Последняя кнопка
            ul.append(renderBtn(lastPage));
        };
    };

    // *************************************************************
    // ****************** Фукнция рендера кнопки *******************
    // *************************************************************
    const renderBtn = (page: number) => {

        const li = document.createElement('li');
        li.classList.add('pagination__item');
        li.textContent = String(page);

        if (currentPage === page) {
            li.classList.add('pagination__item_active');
        }
        return li;
    };

    // *************************************************************
    // *********** Фукнция обработки кликов по пагинации ***********
    // *************************************************************
    const updatePagination = () => {

        pagination.addEventListener('click', (event) => {
            const eventTarget = event.target as HTMLElement;

            if (!eventTarget.closest('.pagination__item')) {
                return;
            } else {
                currentPage = Number(eventTarget.textContent);

                renderProducts(products, productContainer, quantityProductsOnPage, currentPage);
                let currentli = document.querySelector('.pagination__item.pagination__item_active');
                currentli.classList.remove('pagination__item_active');
                eventTarget.classList.add('pagination__item_active');
            }
        });
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


    // ******************** 1 - Рендерим продукты ********************
    renderProducts(products, productContainer, quantityProductsOnPage, currentPage);

    // ******************* 2 - Рендерим пагинацию *******************
    renderPagination(products.length, quantityProductsOnPage, currentPage);

    // ******************* 3 - Обновляем пагинацию *******************
    updatePagination();

    // *************************************************************
    // *********** Функция - обработчик кликов на кнопки ***********
    // *************************************************************
    const liElements = document.querySelectorAll('.pagination__item');
    const handlePagination = (event: Event) => {
        // Обработка нажатий на кнопки вперед/назад
        const currentActiveLi = document.querySelector('.pagination__item_active');
        let newActiveLi;

        const eventTarget = event.target as HTMLElement;

        if (eventTarget.closest('.pagination__arrow')) {
            newActiveLi = currentActiveLi.nextElementSibling;
            console.log('newActiveLi: ', newActiveLi);

            currentPage++;
        } else {
            // newActiveLi = currentActiveLi.previousElementSibling;
            // console.log('newActiveLi: ', newActiveLi);

            // currentPage--;
        };

        if (!newActiveLi && eventTarget.closest('.pagination__arrow')) {
            newActiveLi = liElements[0];
        } else if (!newActiveLi) {
            //newActiveLi = liElements[liElements.length - 1];
        };

        currentActiveLi.classList.remove('pagination__item_active');
        newActiveLi.classList.add('pagination__item_active');

        if (currentPage > liElements.length) {
            currentPage = 1;
        } else if (currentPage < 1) {
            currentPage = liElements.length;
        }

        renderProducts(products, productContainer, quantityProductsOnPage, currentPage);
        renderPagination(products.length, quantityProductsOnPage, currentPage); // добавил

    };

    // ************ 4 - Обработчик клика на кнопку 'далее' ************
    btnNextPagination.addEventListener('click', handlePagination);

    // Кнопка 'назад' отсутствует
    //btnPrevPagination.addEventListener('click', handlePagination);
};


export {
    paginate
};
