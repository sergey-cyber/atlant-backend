//Проверка двух диапозонов дат на перекрытие(наложение друг на друга)
//Принимает два массива, массивы должны содержать только начало и конец периода
//Возвращает true если наложение есть
 
const checkRangesOverlaps = (datesRangesA, datesRangesB) => {
    const convertedDatesA = datesRangesA.map((date) => new Date(date));
    const convertedDatesB = datesRangesB.map((date) => new Date(date));

    return (convertedDatesB[0] >= convertedDatesA[0] && convertedDatesB[0] <= convertedDatesA[1]) || // datesRanges2 start in datesRanges1
           (convertedDatesB[1] >= convertedDatesA[0] && convertedDatesB[1] <= convertedDatesA[1]) || // datesRanges2 end in datesRanges1
           (convertedDatesB[0] <= convertedDatesA[0] && convertedDatesB[1] >= convertedDatesA[1]);   // datesRanges2 encloses datesRanges1
}

//Принимает массив массивов с начальной и конечной датами бронирования
//Проверяет каждый массив и возвращает true если хоть один период дат
//накладывается на выбранный период дат для бронирования
const checkBookingPeriods = (dateRangesArray, selectedDates) => {
    //Если массив массивов пустой, то проверку не делать
    if(!dateRangesArray.length) return
    return dateRangesArray.some((array) => {
            return checkRangesOverlaps(array, selectedDates);
    });
}

module.exports = checkBookingPeriods;