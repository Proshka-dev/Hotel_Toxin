// *********************************************************************************
//                              Основная часть
// *********************************************************************************
const chartUpdate = (chartData: number[]) => {

    const chartElement = document.querySelector('.chart') as HTMLElement;
    if ((chartData.length !== 4) || (!chartElement)) { return }

    renderSumOfVoices({ chartElement, chartData });







}

// *********************************************************************************
//                              Функции
// *********************************************************************************
interface IRenderSumOfVoicesParams {
    chartElement: HTMLElement;
    chartData: number[];
}
function renderSumOfVoices({ chartElement, chartData }: IRenderSumOfVoicesParams) {

    const sumOfVoicesTextElement = chartElement.querySelector('.chart__voices') as HTMLElement;
    if (!sumOfVoicesTextElement) { return };

    let sumOfVoices = 0;
    for (let index = 0; index < chartData.length; index++) {
        sumOfVoices = sumOfVoices + chartData[index];
    }

    sumOfVoicesTextElement.innerText = String(sumOfVoices);
}

// *********************************************************************************
export { chartUpdate }