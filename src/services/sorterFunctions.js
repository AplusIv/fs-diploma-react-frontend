import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat' // ES 2015
dayjs.extend(customParseFormat);

// Сортировка сеансов по дате и времени по возрастанию 
export const compareFnByDateAssending = (a, b) => {
    const dateTimestamp = dayjs(a.date).diff(dayjs(b.date));

    if (dateTimestamp < 0) {
      return -1
    } else if (dateTimestamp > 0) {
      return 1
    }
    // a === b
    return dayjs(a.time, 'HH:mm').diff(dayjs(b.time, 'HH:mm')); // сортировка по столбцу "время" (возврат разницы в миллисекундах )
}
