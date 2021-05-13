const {Router} = require('express');
const router = Router();
const Hostel = require('../models/Hostel');
const setBookingDateForBed = require('../helpers/arrayConvertors');
const checkDateForRelevance = require('../helpers/checkDates');
const findPlaceById = require('../helpers/findPlaceById');
const checkBookingPeriods = require('../helpers/checkBookingPeriods');

//  /api/hostelData/bedsData
router.get('/bedsData', 
async (req, res) => {
    try {   
        const hostel = await Hostel.findOne({_id: '6082e79590f8550a3485247e'}); 
        const beds = checkDateForRelevance(hostel.beds);      
        res.send({resultCode: 0, beds});  //resultCode === 0 то все хорошо
    } catch (error) {
        res.status(500).json({ resultCode: 1, message: 'Что-то пошло не так, попробуте еще раз'});
        console.log(error);
    }
});

//  /api/hostelData/bedsData/setBookingDateForBed
router.patch('/bedsData/setBookingDateForBed', 
async (req, res) => {
    try {   //Ищем в базе номер места приходящий с клиента, фигачим ему период бронирования
        //На клиент отправляем уже обновленный массив
        const hostel = await Hostel.findOne({_id: '6082e79590f8550a3485247e'}); 
        const place = findPlaceById(hostel.beds, req.body.placeNumber);
        if(checkBookingPeriods(place.bookingPeriod, req.body.dateRange)) {
            //Если выбранное место уже кто-то успел занять, то отпраляем на клиент сообщение
            res.send({resultCode: 1, message: 'Это место уже занято выбирете другое'});
        } else {
            //А если место свободно в выбранные даты, то добавляем массив в массив bookingPeriod
            const updatesBeds = setBookingDateForBed(hostel.beds, req.body.placeNumber, req.body.dateRange);
            hostel.beds = [...updatesBeds];
            hostel.markModified('beds');
            await hostel.save();
            res.send({resultCode: 0, beds: hostel.beds});    //resultCode === 0 то все хорошо
        }   
    } catch (error) {
        res.status(500).json({ resultCode: 1, message: 'Что-то пошло не так, попробуте еще раз'});
        console.log(error);
    }
});


module.exports = router;