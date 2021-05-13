const {Schema, model} = require('mongoose');

const schema = new Schema({
    beds: {type: Array}
});

module.exports = model('Hostel', schema);

/* beds: [
    //Имя кровати соответствует местам, которые она в себя включает, 
    //в массиве bookingPeriod должны храниться только начало и конец бронирования
    //Массив bookingPeriod должен содержать либо путые строки, либо даты, третьего не дано
    //В таком виде данные приходят с БД, это пример, который перезатирается при запросе на сервак
    //Структура именно такая для того чтоб можно было ее мапить в разметку 
    {name: 12, places: [{id: 1, bookingPeriod: ['', '']}, {id: 2, bookingPeriod: ['','']}]},
    {name: 34, places: [{id: 3, bookingPeriod: ['','']}, {id: 4, bookingPeriod: ['','']}]},
    {name: 56, places: [{id: 5, bookingPeriod: ['2021-4-22 10:30','2021-4-23 10:30']}, {id: 6, bookingPeriod: ['','']}]},
    {name: 78, places: [{id: 7, bookingPeriod: ['','']}, {id: 8, bookingPeriod: ['','']}]},
    {name: 9, places: [{id: 9, bookingPeriod: ['','']}]}
] */