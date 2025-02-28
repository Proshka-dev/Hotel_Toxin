
// *********************************************************************************
//                              Основная часть
// *********************************************************************************
const changeUserNameInHeader = (userName: string) => {
    const userNameElement = document.querySelector('.header__username') as HTMLElement;
    if (userNameElement) {
        userNameElement.innerText = userName;
    };
};

// *********************************************************************************
//                              Экспорт
// *********************************************************************************
export { changeUserNameInHeader };