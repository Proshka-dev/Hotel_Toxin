// *********************************************************************************
//                              Основная часть
// *********************************************************************************
/** Импорт модуля календаря */
import AirDatepicker from 'air-datepicker';

const dropdownDateFilterActivate = () => {
    /** Кастомные кнопки для календаря */
    let dpButtonApply = {
        content: 'Применить',
        className: 'dp-custom-button-apply',
        onClick: (dp: { hide: () => void }) => {
            if ('hide' in dp) {
                dp.hide();
            }
        }
    }
    let dpButtonClear = {
        content: 'Очистить',
        className: 'dp-custom-button-clear',
        onClick: (dp: { clear: () => void, update: () => void }) => {
            if ('hide' in dp) {
                dp.clear();
                dp.update();
            }
        }
    }

    let index = 0;
    let airDatepickersFilter = [];

    /** Выборка всех .dd-date-split и обработка каждого */
    document.querySelectorAll('.dropdown-date-filter').forEach(function (dropdownDateFilterWrapper) {

        const input = dropdownDateFilterWrapper.querySelector('input') as HTMLInputElement;
        if (!input) { return }; // Если инпута нет - прервать выполнение
        const idInput = input.id; // id первого input

        if (AirDatepicker) {
            const today = Date();
            // @ts-ignore
            airDatepickersFilter[index] = new AirDatepicker('#' + idInput, {
                range: true,
                minDate: today,
                multipleDatesSeparator: ' - ',
                buttons: [dpButtonClear, dpButtonApply],
                dateFormat: 'd MMM'
            });
            // добавляем индекс для следующей итерации
            index = index + 1;
        }
    });

}

// *********************************************************************************
export { dropdownDateFilterActivate }