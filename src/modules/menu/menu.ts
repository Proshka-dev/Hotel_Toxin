// *********************************************************************************
//                              Основная часть
// *********************************************************************************
const menuActivate = () => {

    const nav = document.querySelector('.menu').parentElement as HTMLElement;
    const submenus = nav.querySelectorAll('.menu__item_expendable');
    const dropdowns = nav.querySelectorAll('.menu__item_expendable > .menu__submenu');
    const burgerMenu = document.querySelector('.menu') as HTMLElement;
    const burgerIcon = document.querySelector('.header__burger') as HTMLElement;
    const burgerMenuBody = burgerMenu.querySelector('.menu__body') as HTMLElement;


    // Организовываем открытие/закрытие подменю
    submenus.forEach((item) => {
        const dropdown = item.querySelector(':scope > .menu__submenu') as HTMLElement;
        const button = item.querySelector(':scope > .menu__button') as HTMLElement;

        // открываем/закрываем подменю по клику на кнопку
        button.addEventListener('click', function (e) {
            toggleDropdown({ button, dropdown })
        })

        // Обрабатываем нажатие на Esc
        dropdown.addEventListener('keydown', (e: KeyboardEvent) => {
            //e.stopImmediatePropagation()

            if (e.code === '27' && focusIsInside(dropdown)) {
                toggleDropdown({ button, dropdown })
                button.focus()
            }
        }, false)
    })

    // Закрываем навигацию, если протапались за её пределы
    document.addEventListener('keyup', collapseDropdownsWhenTabbingOutsideNav);

    // Закрываем навигацию, если кликнули вне навигации
    window.addEventListener('click', collapseDropdownsWhenClickingOutsideNav);

    // Показываем меню бургер при нажатии иконку бургера
    burgerIcon.addEventListener('click', openMenuWhenClickIcon)

    // Скрываем меню бургер при нажатии на Esc
    window.addEventListener('keydown', closeMenuWhenPressEsc);

    // Закрываем меню, если кликнули за его пределами
    window.addEventListener('click', closeMenuWhenClickingOutside);
    // *********************************************************************************
    //                              Встроенные функции
    /** Активация / деактивания меню 2 уровня */
    interface IToggleDropdownParams {
        button: HTMLElement;
        dropdown: HTMLElement;
    };
    function toggleDropdown({ button, dropdown }: IToggleDropdownParams) {
        if (button.classList.contains('menu__button_extended')) {
            button.classList.remove('menu__button_extended');
            dropdown.classList.add('menu__submenu_hidden');
        } else {
            button.classList.add('menu__button_extended');
            dropdown.classList.remove('menu__submenu_hidden');
        }
    }

    /** Фокус ввода внутри элемента? */
    function focusIsInside(element: HTMLElement) {
        return element.contains(document.activeElement)
    }

    /** Скрытие подменю протапались за его пределы */
    function collapseDropdownsWhenTabbingOutsideNav(e: KeyboardEvent) {
        if (e.code === '9' && !focusIsInside(nav)) {
            dropdowns.forEach(function (dropdown) {
                dropdown.classList.add('menu__submenu_hidden');
                const btn = dropdown.parentNode.querySelector('button')
                btn.classList.remove('menu__button_extended');
            })
        }
    }

    /** Скрытие подменю по клику снаружи */
    function collapseDropdownsWhenClickingOutsideNav(e: Event) {
        const target = e.target as HTMLElement;

        dropdowns.forEach(function (dropdown) {
            if (!dropdown.parentNode.contains(target)) {
                dropdown.classList.add('menu__submenu_hidden');
                const btn = dropdown.parentNode.querySelector('button')
                btn.classList.remove('menu__button_extended');
            }
        });
    }

    /** Показываем меню бургер при нажатии иконку бургера */
    function openMenuWhenClickIcon(e: Event) {
        console.log('Клик по бургеру');
        //блокировка скролла body при открытом меню
        //document.body.classList.toggle('_lock');
        burgerMenu.classList.add('menu_active');

    }

    /** Скрытие меню по нажатию Esc */
    function closeMenuWhenPressEsc(e: KeyboardEvent) {
        const target = e.target as HTMLElement;
        if (e.code === 'Escape') {
            // Если меню активно, отключаем его
            if (burgerMenu.classList.contains('menu_active')) {
                burgerMenu.classList.remove('menu_active');
            }
        }

    }

    /** Скрытие меню по клику снаружи */
    function closeMenuWhenClickingOutside(e: Event) {
        const target = e.target as HTMLElement;
        //Если клик не по иконке бургера
        // и меню открыто
        // и цель клика не внутри burgerMenuBody

        if ((target !== burgerIcon) && (burgerMenu.classList.contains('menu_active')) && (!burgerMenuBody.contains(target))) {
            burgerMenu.classList.remove('menu_active');
        }
    }
}

// *********************************************************************************
//                              Экспорт
// *********************************************************************************
export { menuActivate }