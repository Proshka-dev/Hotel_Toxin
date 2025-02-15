


const paginate = (products: { id: string; name: string; }[]) => {
    console.log('products: ', products);

    let productCount = 7;
    let currentPage = 1;

    const productContainer = document.querySelector('.js-products-list') as HTMLElement;
    const pagination = document.querySelector('.js-pagination') as HTMLElement;
    const btnPrevPagination = document.querySelector('.js-pagination-btn-prev') as HTMLElement;
    const btnNextPagination = document.querySelector('.js-pagination-btn-next') as HTMLElement;

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
            li.classList.add('product', 'item', 'column', 'aic', 'js-product');
            li.innerHTML = `<div class="product-id"> ${id} </div> <div class="product-name"> ${name} </div > `;
            container.append(li);
        });

        renderProducts(products, productContainer, productCount, currentPage);

    };

    const renderPagination = (products: { id: string; name: string; }[], numberOfProducts: number) => {

        const pagesCount = Math.ceil(products.length / numberOfProducts);
        console.log('pagesCount : ', pagesCount);

        const ul = document.querySelector('.js-pagination-list');

        for (let i = 1; i <= pagesCount; i++) {
            const li = renderBtn(i);
            ul.append(li);
        }


        pagination.classList.remove('hidden');
    };

    const renderBtn = (page: number) => {

        const li = document.createElement('li');
        li.classList.add('pagination-item', 'row', 'jcc', 'aic');
        li.textContent = String(page);

        if (currentPage === page) {
            li.classList.add('active');
        }
        return li;
    };

    const updatePagination = () => {

        pagination.addEventListener('click', (event) => {
            const eventTarget = event.target as HTMLElement;

            if (!eventTarget.closest('.pagination-item')) {
                return;
            } else {
                currentPage = Number(eventTarget.textContent);

                renderProducts(products, productContainer, productCount, currentPage);
                let currentli = document.querySelector('.pagination-item.active');
                currentli.classList.remove('active');
                eventTarget.classList.add('active');
            }
        });
    };



    renderProducts(products, productContainer, productCount, currentPage);
    renderPagination(products, productCount);
    updatePagination();

    const liElements = document.querySelectorAll('.pagination-utem');

    const handlePagination = (event: Event) => {
        // Обработка нажатий на кнопки вперед/назад
        const currentActiveLi = document.querySelector('.pagination-item.active');
        let newActiveLi;

        const eventTarget = event.target as HTMLElement;

        if (eventTarget.closest('.js-pagination-btn-next')) {
            newActiveLi = currentActiveLi.nextElementSibling;
            console.log('newActiveLi: ', newActiveLi);

            currentPage++;
        } else {
            newActiveLi = currentActiveLi.previousElementSibling;
            console.log('newActiveLi: ', newActiveLi);

            currentPage--;
        };

        if (!newActiveLi && eventTarget.closest('.js-pagination-btn-next')) {
            newActiveLi = liElements[0];
        } else if (!newActiveLi) {
            newActiveLi = liElements[liElements.length - 1];
        };

        currentActiveLi.classList.remove('active');
        newActiveLi.classList.add('active');

        if (currentPage > liElements.length) {
            currentPage = 1;
        } else if (currentPage < 1) {
            currentPage = liElements.length;
        }

        renderProducts(products, productContainer, productCount, currentPage);
    };

    btnNextPagination.addEventListener('click', handlePagination);
    btnPrevPagination.addEventListener('click', handlePagination);
};


export {
    paginate
};
