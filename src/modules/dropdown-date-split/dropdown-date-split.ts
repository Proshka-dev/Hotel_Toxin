// Импорт модуля календаря
import AirDatepicker from "air-datepicker";

// Кастомные кнопки для календаря
let dpButtonApply = {
  content: "Применить",
  className: "dp-custom-button-apply",
  onClick: (dp: { hide: () => void }) => {
    if ("hide" in dp) {
      dp.hide();
      //console.log('type of:', (dp.hide()));
    }
  },
};

let dpButtonClear = {
  content: "Очистить",
  className: "dp-custom-button-clear",
  onClick: (dp: { clear: () => void; update: () => void }) => {
    if ("hide" in dp) {
      dp.clear();
      dp.update();
      //console.log('type of:', (dp.hide()));
    }
  },
};

// Функция форматирования даты
function dateToStringDMY(date: Date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return "" + (d <= 9 ? "0" + d : d) + "." + (m <= 9 ? "0" + m : m) + "." + y;
}

// Функция внесения даты начала и конца интервала в 2 inputa
function rangeToInputs({
  range,
  idInput1,
  idInput2,
}: {
  range: Array<Date>;
  idInput1: String;
  idInput2: String;
}) {
  const input1 = document.querySelector("#" + idInput1);
  const input2 = document.querySelector("#" + idInput2);
  if (input1 && input2) {
    //Если существуют input1 и input2
    if ("value" in input1 && "value" in input2) {
      //и у них есть поле "value"
      if (range[0]) {
        input1.value = dateToStringDMY(range[0]);
      }
      if (range[1]) {
        input2.value = dateToStringDMY(range[1]);
      } else {
        input2.value = "";
      }
    }
  }
}

if (AirDatepicker) {
  // @ts-ignore
  const AirDatepicker1 = new AirDatepicker('#inputdate1', {
    range: true,
    multipleDatesSeparator: ' - ',
    buttons: [dpButtonClear, dpButtonApply],
    //inline: true,
    onSelect: function ({ date }: { date: Array<Date> }) {
      // Вызов функции внесения даты начала и конца интервала в 2 inputa
      rangeToInputs({ range: date, idInput1: 'inputdate1', idInput2: 'inputdate2' });
    },
  });

  // Функционал открытия и закрытия календаря
  const Input1 = document.querySelector('#inputdate1') as HTMLElement;
  const Input2 = document.querySelector("#inputdate2") as HTMLElement;
  const Icon1 = Input1.parentElement.lastElementChild as HTMLElement;
  const Icon2 = Input2.parentElement.lastElementChild as HTMLElement;
  if ((Input1) && (Input2) && (Icon1) && (Icon2)) {

    // Открытие календаря по фокусу на второй инпут
    Input2.addEventListener('focus', function (e) {
      Input1.focus();
    });


    // Закрытие по клику на иконки
    Icon1.addEventListener('click', function (e) {
      if (AirDatepicker1.visible) {
        AirDatepicker1.hide();
      } else {
        Input1.focus();
      };
    });
    Icon2.addEventListener('click', function (e) {
      if (AirDatepicker1.visible) {
        AirDatepicker1.hide();
      } else {
        Input1.focus();
      };
    });


  }
}

