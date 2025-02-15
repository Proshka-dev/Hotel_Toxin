
const paginate = (products: { id: string; name: string; }[]) => {
    console.log('products: ', products);

    let productCount = 5;
    let currentPage = 1;

    const productContainer = document.querySelector('.products-list__list') as HTMLElement;
    const pagination = document.querySelector('.pagination__list') as HTMLElement;
    // Кнопка 'назад' отсутствует
    //const btnPrevPagination = document.querySelector('.pagination__arrow-prev') as HTMLElement;
    const btnNextPagination = document.querySelector('.pagination__arrow') as HTMLElement;
    const paginationText = document.querySelector('.pagination__text') as HTMLElement;

    // *************************************************************
    // ***************** Фукнция рендера продуктов *****************
    // *************************************************************
    const renderProducts = (products: { id: string; name: string; }[], container: HTMLElement, numberOfProducts: number, page: number) => {
        productContainer.innerHTML = '';

        const firstProductIndex = numberOfProducts * page - numberOfProducts;
        console.log('firstProductIndex: ', firstProductIndex);

        const lastProductIndex = firstProductIndex + numberOfProducts;
        console.log('lastProductIndex: ', lastProductIndex);

        //вырезаем нужную часть массива
        const productsOnPage = products.slice(firstProductIndex, lastProductIndex);
        console.log('productsOnPage: ', productsOnPage);


        productsOnPage.forEach(({ id, name }) => {
            const li = document.createElement('li');
            li.classList.add('products-list__item');
            li.innerHTML = `<div class='products-list__id'> ${id} </div> <div class='products-list__name'> ${name} </div > `;
            container.append(li);

            console.log('Product li: ', li);
        });

        // Обновляем текстовую часть
        paginationText.innerText = renderText(firstProductIndex + 1, lastProductIndex, products.length);


    };

    // *************************************************************
    // ***************** Фукнция рендера пагинации *****************
    // *************************************************************
    const renderPagination = (products: { id: string; name: string; }[], numberOfProducts: number) => {

        const pagesCount = Math.ceil(products.length / numberOfProducts);
        console.log('pagesCount : ', pagesCount);

        const ul = document.querySelector('.pagination__list');

        console.log('pagination__list: ', ul);

        ul.innerHTML = '';

        for (let i = 1; i <= pagesCount; i++) {
            const li = renderBtn(i);
            ul.append(li);
        }



        //pagination.classList.remove('hidden');
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

                renderProducts(products, productContainer, productCount, currentPage);
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

        if ((totalQuantity === 1) || (totalQuantity % 10 === 1)) {
            resultString = resultString + ' варианта аренды'
        } else {
            resultString = resultString + ' вариантов аренды'
        };

        return resultString;
    };


    // ******************** 1 - Рендерим продукты ********************
    renderProducts(products, productContainer, productCount, currentPage);

    // ******************* 2 - Рендерим пагинацию *******************
    renderPagination(products, productCount);

    // ******************* 3 - Обновляем пагинацию *******************
    updatePagination();


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

        renderProducts(products, productContainer, productCount, currentPage);
    };

    // ************ 4 - Обработчик клика на кнопку 'далее' ************
    btnNextPagination.addEventListener('click', handlePagination);

    // Кнопка 'назад' отсутствует
    //btnPrevPagination.addEventListener('click', handlePagination);
};


export {
    paginate
};
