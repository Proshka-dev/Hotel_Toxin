// Функция разделения числа по разрядам
function divideDigits(str: string) {
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}


// Функция по назначению обработчиков событий на открытие и закрытие списка
interface IRangeSliderParams {
    vRangeInputMin: HTMLInputElement,
    vRangeInputMax: HTMLInputElement,
    vRangeProgress: HTMLElement,
    vTextElement: HTMLElement,
    vPriceGap: number,
    vMinPrice: number,
    vSetMin: boolean

}

const rangeSliderUpdate = function (params: IRangeSliderParams) {
    const { vRangeInputMin, vRangeInputMax, vRangeProgress, vTextElement, vPriceGap, vMinPrice, vSetMin } = params;

    // min and max
    let minVal = parseInt(vRangeInputMin.value); // низ диапазона
    let maxVal = parseInt(vRangeInputMax.value); // верх диапазона
    //let min = 

    // min
    if ((maxVal - minVal) < vPriceGap) {
        // Если разница между значениями меньше установленной

        if (vSetMin) {
            // установка низа диапазона = (верх_диапазона) - (минимальная_разница)
            vRangeInputMin.value = String(maxVal - vPriceGap);
            minVal = parseInt(vRangeInputMin.value);
        } else {
            // установка верха диапазона = (низ_диапазона) + (минимальная_разница)
            vRangeInputMax.value = String(minVal + vPriceGap);
            maxVal = parseInt(vRangeInputMax.value);
        };
    };
    // Если разница между значениями больше заданной
    vRangeProgress.style.left = (((minVal - vMinPrice) / (parseInt(vRangeInputMin.max) - vMinPrice)) * 100) + '%';
    vRangeProgress.style.right = 100 - ((maxVal - vMinPrice) / (parseInt(vRangeInputMax.max) - vMinPrice)) * 100 + '%';

    // Вывод значений в vTextElement
    vTextElement.innerHTML = divideDigits(vRangeInputMin.value) + '₽ - ' + divideDigits(vRangeInputMax.value) + '₽';
};




// *****************************************************************************
// ************** Выборка всех .slider-range и обработка каждого ***************
// *****************************************************************************
document.querySelectorAll('.slider-range').forEach(function (sliderRangeWrapper: HTMLElement) {
    // Селекторы
    const rangeInputMin = sliderRangeWrapper.querySelector('.slider-range__min') as HTMLInputElement; // [0]
    const rangeInputMax = sliderRangeWrapper.querySelector('.slider-range__max') as HTMLInputElement; // [1]
    const rangeProgress = sliderRangeWrapper.querySelector('.slider-range__progress') as HTMLElement;
    const textElement = sliderRangeWrapper.querySelector('.slider-range__text') as HTMLElement;

    // Переменные
    let priceGap = parseInt(sliderRangeWrapper.dataset.gap); // минимальная разница между максимумом и минимумом
    let minPrice = parseInt(sliderRangeWrapper.dataset.min); // минимальный порог цены

    // Event - ввод на элементе с нижним порогом диапазона
    rangeInputMin.addEventListener('input', e => {
        rangeSliderUpdate({
            vRangeInputMin: rangeInputMin,
            vRangeInputMax: rangeInputMax,
            vRangeProgress: rangeProgress,
            vTextElement: textElement,
            vPriceGap: priceGap,
            vMinPrice: minPrice,
            vSetMin: true
        });
    });

    // Event - ввод на элементе с верхним порогом диапазона
    rangeInputMax.addEventListener('input', e => {
        rangeSliderUpdate({
            vRangeInputMin: rangeInputMin,
            vRangeInputMax: rangeInputMax,
            vRangeProgress: rangeProgress,
            vTextElement: textElement,
            vPriceGap: priceGap,
            vMinPrice: minPrice,
            vSetMin: false
        });
    });

    // Первоначальная установка положения ввыбранного диапазона
    rangeSliderUpdate({
        vRangeInputMin: rangeInputMin,
        vRangeInputMax: rangeInputMax,
        vRangeProgress: rangeProgress,
        vTextElement: textElement,
        vPriceGap: priceGap,
        vMinPrice: minPrice,
        vSetMin: true
    });

});