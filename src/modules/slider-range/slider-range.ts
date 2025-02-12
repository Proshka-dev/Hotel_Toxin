const sliderRangeWrapper = document.querySelector('.slider-range') as HTMLElement;
const rangeInputMin = sliderRangeWrapper.querySelector('.slider-range__min') as HTMLInputElement; // [0]
const rangeInputMax = sliderRangeWrapper.querySelector('.slider-range__max') as HTMLInputElement; // [1]

//const priceInput = document.querySelectorAll(".price-input input");
const range = sliderRangeWrapper.querySelector('.slider-range__progress') as HTMLElement;

let priceGap = 100; // минимальная разница между максимумом и минимумом
let minPrice = parseInt(sliderRangeWrapper.dataset.min); // минимальный порог цены
let maxPrice = parseInt(sliderRangeWrapper.dataset.max); // максимальный порог цены

rangeInputMin.addEventListener('input', e => {
    let minVal = parseInt(rangeInputMin.value); // низ диапазона
    let maxVal = parseInt(rangeInputMax.value); // верх диапазона
    if ((maxVal - minVal) < priceGap) {
        // Если разница между значениями меньше установленной
        rangeInputMin.value = String(maxVal - priceGap); // установка низа диапазона = (верх_диапазона) - (минимальная_разница)
    } else {
        // Если разница между значениями больше заданной
        // rangeInputMin.value = minVal;
        // rangeInputMax.value = maxVal;
        range.style.left = ((minVal / parseInt(rangeInputMin.max)) * 100) + '%';
    }
});

rangeInputMax.addEventListener('input', e => {
    let minVal = parseInt(rangeInputMin.value);
    let maxVal = parseInt(rangeInputMax.value);
    if ((maxVal - minVal) < priceGap) {
        // Если разница между значениями меньше установленной
        rangeInputMax.value = String(minVal + priceGap); // установка верха диапазона = (низ_диапазона) + (минимальная_разница)
    } else {
        // Если разница между значениями больше заданной
        // rangeInputMin.value = minVal;
        // rangeInputMax.value = maxVal;
        range.style.right = 100 - (maxVal / parseInt(rangeInputMax.max)) * 100 + '%';
    }
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