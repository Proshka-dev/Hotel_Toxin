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


//@ts-ignore
if (AirDatepicker) {
    // @ts-ignore
    const AirDatepicker2 = new AirDatepicker('#inputfilter1', {
        range: true,
        multipleDatesSeparator: ' - ',
        buttons: [dpButtonClear, dpButtonApply],
        //        inline: true,
        dateFormat: 'd MMM'
    });
}
