// Импорт модуля календаря
import AirDatepicker from 'air-datepicker';

// Кастомные кнопки для календаря
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


if (AirDatepicker) {
    // @ts-ignore
    new AirDatepicker('#inputfilter1', {
        range: true,
        multipleDatesSeparator: ' - ',
        buttons: [dpButtonClear, dpButtonApply],
        dateFormat: 'd MMM'
    });
}
