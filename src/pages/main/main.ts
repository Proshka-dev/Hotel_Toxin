//import * as flsFunctions from "./modules/functions.js"
//flsFunctions.isWebp();

//- Подключение календаря
//import AirDatepicker from 'air-datepicker';
// @ts-ignore
if (AirDatepicker) {
    // @ts-ignore
    const AirDatepicker1 = new AirDatepicker('#inputdate1', {
        range: true,
        multipleDatesSeparator: ' - ',
        buttons: ['clear'],
        onSelect: function ({ date, formattedDate, datepicker }) {
            const input1 = document.querySelector('#inputdate1');
            const input2 = document.querySelector('#inputdate2');
            if (formattedDate[0]) { input1.value = formattedDate[0] };
            if (formattedDate[1]) {
                input2.value = formattedDate[1]
            } else {
                input2.value = '';
            }
        }
    });
    // @ts-ignore
    const AirDatepicker2 = new AirDatepicker('#inputdate2', {
        range: true,
        multipleDatesSeparator: ' - ',
        buttons: ['clear'],
        onSelect: function ({ date, formattedDate, datepicker }) {
            const input1 = document.querySelector('#inputdate1');
            const input2 = document.querySelector('#inputdate2');
            if (formattedDate[0]) { input1.value = formattedDate[0] };
            if (formattedDate[1]) {
                input2.value = formattedDate[1]
            } else {
                input2.value = '';
            }
        }
    });

}

