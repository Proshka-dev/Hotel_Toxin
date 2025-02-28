const changeUserNameInHeader = (userName: string) => {
    const userNameElement = document.querySelector('.header__username') as HTMLElement;
    if (userNameElement) {
        userNameElement.innerText = userName;
    };
};
export { changeUserNameInHeader };