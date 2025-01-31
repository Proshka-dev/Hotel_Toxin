//import * as flsFunctions from "./modules/functions.js"
//flsFunctions.isWebp();
console.log('Привет из TS файла');
//- Подключение календаря
//import AirDatepicker from 'air-datepicker';
// @ts-ignore
if (AirDatepicker) {
    // @ts-ignore
    var AirDatepicker1 = new AirDatepicker('#inputdate1', {
        range: true,
        multipleDatesSeparator: ' - ',
        buttons: ['clear'],
        onSelect: function (_a) {
            var date = _a.date, formattedDate = _a.formattedDate, datepicker = _a.datepicker;
            var input1 = document.querySelector('#inputdate1');
            var input2 = document.querySelector('#inputdate2');
            if (formattedDate[0]) {
                input1.value = formattedDate[0];
            }
            ;
            if (formattedDate[1]) {
                input2.value = formattedDate[1];
            }
            else {
                input2.value = '';
            }
        }
    });
    // @ts-ignore
    var AirDatepicker2 = new AirDatepicker('#inputdate2', {
        range: true,
        multipleDatesSeparator: ' - ',
        buttons: ['clear'],
        onSelect: function (_a) {
            var date = _a.date, formattedDate = _a.formattedDate, datepicker = _a.datepicker;
            var input1 = document.querySelector('#inputdate1');
            var input2 = document.querySelector('#inputdate2');
            if (formattedDate[0]) {
                input1.value = formattedDate[0];
            }
            ;
            if (formattedDate[1]) {
                input2.value = formattedDate[1];
            }
            else {
                input2.value = '';
            }
        }
    });
}
//new AirDatepicker('#inputdate1');
