
//Принимает массив beds и проверяет в нем все массивы с забронированными датами
//Если срок бронирования истек(вторая дата в массиве меньше текущей)
//То эти даты удаляются
const checkDateForRelevance = (bedsArray) => {
    bedsArray.forEach( (bed) => {
        bed.places.forEach((place) => {
            place.bookingPeriod.forEach((dateRange, i, array) => {
                if(new Date(dateRange[1]) < new Date()) {
                    array.splice(i, 1);
                }
            })
        })
    });
    return bedsArray;
}

module.exports = checkDateForRelevance;