// ************************ Функции ************************
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

// ************************ Основная часть ************************

const nav = document.querySelector('.menu').parentElement as HTMLElement;
const submenus = nav.querySelectorAll('.menu__item_expendable');
const dropdowns = nav.querySelectorAll('.menu__item_expendable > .menu__submenu');


// Находим подменю
submenus.forEach((item) => {
    const dropdown = item.querySelector(':scope > .menu__submenu') as HTMLElement;
    const button = item.querySelector(':scope > .menu__button') as HTMLElement;

    button.addEventListener('click', function (e) {
        toggleDropdown({ button, dropdown })
    })

    // Обрабатываем нажатие на Esc
    dropdown.addEventListener('keydown', (e: KeyboardEvent) => {
        e.stopImmediatePropagation()

        if (e.code === '27' && focusIsInside(dropdown)) {
            toggleDropdown({ button, dropdown })
            button.focus()
        }
    }, false)
})


// Закрываем навигацию, если протапались за её пределы
document.addEventListener('keyup', collapseDropdownsWhenTabbingOutsideNav)

// Закрываем навигацию, если кликнули вне навигации
window.addEventListener('click', collapseDropdownsWhenClickingOutsideNav)
