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
  let event = new Event('input');

  if (input1 && input2) {
    //Если существуют input1 и input2
    if ("value" in input1 && "value" in input2) {
      //и у них есть поле "value"
      if (range[0]) {
        input1.value = dateToStringDMY(range[0]);
        input1.dispatchEvent(event);
      }
      if (range[1]) {
        input2.value = dateToStringDMY(range[1]);
        input2.dispatchEvent(event);
      } else {
        input2.value = "";
        input2.dispatchEvent(event);
      }
    }
  }
}

if (AirDatepicker) {

  let index = 0;
  let airDatepickers = [];

  // Выборка всех .dd-date-split и обработка каждого
  document.querySelectorAll('.dd-date-split').forEach(function (dropdownDateSplitWrapper) {

    // определение переменных, зависящих от текущего .dd-date-split
    const inputs = dropdownDateSplitWrapper.querySelectorAll('input');
    if (inputs.length < 2) { return }; // Если инпутов меньше 2 - прервать выполнение

    const Input1 = inputs[0] as HTMLInputElement;
    const Input2 = inputs[1] as HTMLInputElement;
    const idInput1 = Input1.id; // id первого input
    const idInput2 = Input2.id; // id второго input
    const Icon1 = Input1.parentElement.lastElementChild as HTMLElement;
    const Icon2 = Input2.parentElement.lastElementChild as HTMLElement;

    if (!((Icon1) && (Icon2))) { return }; // Если не нашли иконки - прервать выполнение

    const today = Date();
    // @ts-ignore
    airDatepickers[index] = new AirDatepicker('#' + idInput1, {
      range: true,
      minDate: today,
      multipleDatesSeparator: ' - ',
      buttons: [dpButtonClear, dpButtonApply],
      onSelect: function ({ date }: { date: Array<Date> }) {
        // Вызов функции внесения даты начала и конца интервала в 2 inputa
        rangeToInputs({ range: date, idInput1, idInput2 });
      },
    });

    // Открытие календаря по фокусу на второй инпут
    Input2.addEventListener('focus', function (e) {
      Input1.focus();
    });


    // Закрытие по клику на иконки
    Icon1.addEventListener('click', function (e) {
      if (airDatepickers[index].visible) {
        airDatepickers[index].hide();
      } else {
        Input1.focus();
      };
    });
    Icon2.addEventListener('click', function (e) {
      if (airDatepickers[index].visible) {
        airDatepickers[index].hide();
      } else {
        Input1.focus();
      };
    });

    // добавляем индекс для следующей итерации
    index = index + 1;
  });
};
