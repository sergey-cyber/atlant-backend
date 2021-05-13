
//Хэлпер для установки периода дат бронирования для выбранного места
//Принимает массив beds, номер места в котором нужно добавить период бронирования 
//и массив с датами начала и конца периода бронирования
//Возвращает обновленный массив beds
const setBookingDateForBed = (array, id, dateRange) => { 
    let result = []; 
    //Преобразовываем id к числу если он приходит как строка
    array.forEach((obj) => { 
        obj.places.forEach((el) => { 
            if(String(el.id) === id) { 
                el.bookingPeriod.push(dateRange); 
            }  
        }); 
        result.push(obj);     
    }) 
    return result; 
} 

module.exports = setBookingDateForBed;