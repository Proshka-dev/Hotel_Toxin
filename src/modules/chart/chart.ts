/** Импорт вспомогательных функций */
import { numWord, sumArray } from '../../common/utils.js';

// *********************************************************************************
//                              Основная часть
// *********************************************************************************
function chartUpdate(chartData: number[], options: { gap: number }) {

	const chartElement = document.querySelector('.chart') as HTMLElement;
	if ((chartData.length !== 4) || (!chartElement)) { return }

	renderSumOfVoices({ chartElement, chartData });
	renderChart({ chartElement, chartData, gap: options.gap });
}

// *********************************************************************************
//                              Функции
// *********************************************************************************
/** Функция, отображающая сумму всех голосов и меняющая окончание текста под суммой */
interface IRenderSumOfVoicesParams {
	chartElement: HTMLElement;
	chartData: number[];
}
function renderSumOfVoices({ chartElement, chartData }: IRenderSumOfVoicesParams) {

	const sumOfVoicesTextElement = chartElement.querySelector('.chart__voices') as HTMLElement;
	const sumOfVoicesLabel = chartElement.querySelector('.chart__voices-label') as HTMLElement;

	if ((!sumOfVoicesTextElement) || (!sumOfVoicesLabel)) { return };

	const sumOfVoices = sumArray(chartData);

	sumOfVoicesTextElement.innerText = String(sumOfVoices);
	sumOfVoicesLabel.innerText = numWord(sumOfVoices, ['голос', 'голоса', 'голосов']);
}

/** Функция для отображения линий диаграммы */
interface IRenderChartParams {
	chartElement: HTMLElement;
	chartData: number[];
	gap: number;
}
function renderChart({ chartElement, chartData, gap }: IRenderChartParams) {
	const sumOfVoices = sumArray(chartData);
	let currSumOfVoices = 0;
	const circleElements = chartElement.querySelectorAll('.chart__circle');

	if (circleElements.length !== 4) { return };

	/** Если все значения кроме одного равны 0, то gap не нужен*/
	chartData.forEach(element => {
		if (element === sumOfVoices) { gap = 0 }
	});

	/** Перебираем, начиная с конца массива
	 * (заполняется с "12 часов" по часовой стрелке, первыми идут плохие отзывы) */
	for (let i = 0; i < chartData.length; i++) {
		const currCircleElement = circleElements[i] as HTMLElement;
		let gapFromBegining = currSumOfVoices / sumOfVoices * 100 + (gap / 2);

		let currPieLength = chartData[chartData.length - 1 - i] / sumOfVoices * 100 - gap;

		/** Если не хватает места, чтобы отобразить текущую линию
		 * то корректируем отступ от начала и длину линии */
		if (currPieLength < 0) {
			gapFromBegining = gapFromBegining + currPieLength + gap / 2;
			currPieLength = 0;
		}

		/** Так как при установленном радиусе окружности 15.9155 длина окружности равна 100,
		 * то, допустим, stroke-dasharray = '0 25 75 100'
		 * заполнит круг, начиная с 25% длины на 75% длины круга*/
		const currStrokeDasharray = `0  ${String(gapFromBegining)} ${String(currPieLength)} 100`;
		// console.log('currStrokeDasharray:', currStrokeDasharray);

		currCircleElement.setAttribute('stroke-dasharray', currStrokeDasharray);
		currSumOfVoices = currSumOfVoices + chartData[chartData.length - 1 - i];
	}
}
// *********************************************************************************
export { chartUpdate }