// Импорт модуля календаря
//import AirDatepicker from 'air-datepicker';

// Кастомные кнопки для календаря
if (!dpButtonApply) {
    let dpButtonApply = {
        content: 'Применить',
        className: 'dp-custom-button-apply',
        onClick: (dp: { hide: () => void }) => {
            if ('hide' in dp) {
                dp.hide();
            }
        }
    }
}

if (!dpButtonClear) {
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
}


//- Подключение календаря
//import AirDatepicker from 'air-datepicker';
// @ts-ignore
if (AirDatepicker) {
    // @ts-ignore
    const AirDatepicker3 = new AirDatepicker('#inputfilter1', {
        range: true,
        multipleDatesSeparator: ' - ',
        buttons: [dpButtonClear, dpButtonApply],
        //        inline: true,
        dateFormat: 'd MMM'
    });
}
