const {Schema, model} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    telephonNumber: {type: String, required: true}, 
    //Номер телефона обязателен, для отслеживания и списания бонусов
    //Нужно реализоать подтверждение номера при регистрации или списании бонусов
    name: {type: String},
    attendanceData: {type: Array},  //Данные о посещаемости(даты посещения и количество дней)
    bonuses: {type: Number} //Бонусы, накапливаемые с каждым посещением
});

module.exports = model('User', schema);