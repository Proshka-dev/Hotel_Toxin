const nav = document.querySelector('.menu').parentElement;

const submenus = nav.querySelectorAll(
    '.menu__item_expendable'
)
const dropdowns = nav.querySelectorAll(
    '.menu__item_expendable > .menu__submenu'
)

// Находим подменю
submenus.forEach((item) => {
    const dropdown = item.querySelector(':scope > .menu__submenu')
    const button = item.querySelector(':scope > .menu__button')

    button.addEventListener('click', function (e) {
        toggleDropdown(button, dropdown)
    })

    // Обрабатываем нажатие на Esc
    dropdown.addEventListener('keydown', (e) => {
        e.stopImmediatePropagation()

        if (e.keyCode === 27 && focusIsInside(dropdown)) {
            toggleDropdown(button, dropdown)
            button.focus()
        }
    }, false)
})

function toggleDropdown(button, dropdown) {
    if (button.classList.contains('menu__button_extended')) {
        button.classList.remove('menu__button_extended');
        dropdown.classList.add('menu__submenu_hidden');
    } else {
        button.classList.add('menu__button_extended');
        dropdown.classList.remove('menu__submenu_hidden');
    }
    // if (button.getAttribute('aria-expanded') === 'true') {
    //     button.setAttribute('aria-expanded', 'false')
    //     dropdown.classList.add('menu__submenu_hidden');
    // } else {
    //     button.setAttribute('aria-expanded', 'true')
    //     dropdown.classList.remove('menu__submenu_hidden');
    // }
}

function focusIsInside(element) {
    return element.contains(document.activeElement)
}

function collapseDropdownsWhenTabbingOutsideNav(e) {
    if (e.keyCode === 9 && !focusIsInside(nav)) {
        dropdowns.forEach(function (dropdown) {
            dropdown.classList.add('menu__submenu_hidden');
            const btn = dropdown.parentNode.querySelector('button')
            btn.classList.remove('menu__button_extended');
            //btn.setAttribute('aria-expanded', 'false')
        })
    }
}

function collapseDropdownsWhenClickingOutsideNav(e) {
    const target = e.target

    dropdowns.forEach(function (dropdown) {
        if (!dropdown.parentNode.contains(target)) {
            // dropdown.setAttribute('hidden', '')
            dropdown.classList.add('menu__submenu_hidden');
            const btn = dropdown.parentNode.querySelector('button')
            btn.classList.remove('menu__button_extended');
            // btn.setAttribute('aria-expanded', 'false')
        }
    });
}

// Закрываем навигацию, если протапались за её пределы
document.addEventListener('keyup', collapseDropdownsWhenTabbingOutsideNav)

// Закрываем навигацию, если кликнули вне навигации
window.addEventListener('click', collapseDropdownsWhenClickingOutsideNav)
