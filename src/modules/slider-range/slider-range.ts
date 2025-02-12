// Функция по назначению обработчиков событий на открытие и закрытие списка
interface IRangeSliderParams {
    vRangeInputMin: HTMLInputElement,
    vRangeInputMax: HTMLInputElement,
    vRangeProgress: HTMLElement,
    vTextElement: HTMLElement,
    vPriceGap: number
}

const rangeSliderUpdate = function (params: IRangeSliderParams) {
    const { vRangeInputMin, vRangeInputMax, vRangeProgress, vTextElement, vPriceGap } = params;

    // min and max
    let minVal = parseInt(vRangeInputMin.value); // низ диапазона
    let maxVal = parseInt(vRangeInputMax.value); // верх диапазона

    // min
    if ((maxVal - minVal) < vPriceGap) {
        // Если разница между значениями меньше установленной
        vRangeInputMin.value = String(maxVal - vPriceGap); // установка низа диапазона = (верх_диапазона) - (минимальная_разница)
        vRangeInputMax.value = String(minVal + vPriceGap); // установка верха диапазона = (низ_диапазона) + (минимальная_разница)
    } else {
        // Если разница между значениями больше заданной
        vRangeProgress.style.left = ((minVal / parseInt(vRangeInputMin.max)) * 100) + '%';
        vRangeProgress.style.right = 100 - (maxVal / parseInt(vRangeInputMax.max)) * 100 + '%';
    }
};






const sliderRangeWrapper = document.querySelector('.slider-range') as HTMLElement;
const rangeInputMin = sliderRangeWrapper.querySelector('.slider-range__min') as HTMLInputElement; // [0]
const rangeInputMax = sliderRangeWrapper.querySelector('.slider-range__max') as HTMLInputElement; // [1]

//const priceInput = document.querySelectorAll(".price-input input");
const rangeProgress = sliderRangeWrapper.querySelector('.slider-range__progress') as HTMLElement;
const textElement = sliderRangeWrapper.querySelector('.slider-range__text') as HTMLElement;

let priceGap = 1000; // минимальная разница между максимумом и минимумом
let minPrice = parseInt(sliderRangeWrapper.dataset.min); // минимальный порог цены
let maxPrice = parseInt(sliderRangeWrapper.dataset.max); // максимальный порог цены
// Возможно нужно назначить мин и макс пределы для инпутов ???????????????????????????????????????????

rangeInputMin.addEventListener('input', e => {

    rangeSliderUpdate({
        vRangeInputMin: rangeInputMin,
        vRangeInputMax: rangeInputMax,
        vRangeProgress: rangeProgress,
        vTextElement: textElement,
        vPriceGap: priceGap
    });
});

rangeInputMax.addEventListener('input', e => {

    rangeSliderUpdate({
        vRangeInputMin: rangeInputMin,
        vRangeInputMax: rangeInputMax,
        vRangeProgress: rangeProgress,
        vTextElement: textElement,
        vPriceGap: priceGap
    });
});


// Первоначальная установка средней части
rangeSliderUpdate({
    vRangeInputMin: rangeInputMin,
    vRangeInputMax: rangeInputMax,
    vRangeProgress: rangeProgress,
    vTextElement: textElement,
    vPriceGap: priceGap
});



// *****************************************************************************
// ************** Выборка всех .slider-range и обработка каждого ***************
// *****************************************************************************
// document.querySelectorAll('.button-like').forEach(function (buttonLike: HTMLElement) {
//     buttonLike.addEventListener('click', function () {
//         let value = Number(buttonLike.dataset.value);
//         if (buttonLike.classList.contains('button-like_active')) {
//             // Если была активна
//             value = value - 1;
//         } else {
//             // Если была неактивна
//             value = value + 1;
//         };

//         // Изменяем значение data-value
//         buttonLike.dataset.value = String(value);
//         // Изменяем отображаемый текст
//         buttonLike.querySelector('.button-like__text').innerHTML = String(value);
//         // Переключаем класс button-like_active
//         buttonLike.classList.toggle('button-like_active');

//     });
// });