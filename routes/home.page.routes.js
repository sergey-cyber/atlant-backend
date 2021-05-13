const {Router} = require('express');
const router = Router();
const Review = require('../models/Review');
const lodash = require('lodash');
const calcAverageRating = require('../helpers/calcAverageRating');

//  /api/home
//Get first 3 reviews at the first request
router.get('/', 
async (req, res) => {
    try {   
        const reviews = await Review.find({}) //return all reviews in array
        reviews.reverse(); //Переварачиваем массив, чтоб ранние отзывы были в начале
        const averageRating = calcAverageRating(reviews); //Считаем средний рейтинг
        const totalReviewsCount = reviews.length;  //Общее число отзывов в базе
        //Делим общий массив на части и Вычисляем запрашиваемую пользователем часть отзывов
        const currentReviewsPart = lodash.chunk(reviews, req.query.revPartSize)[req.query.currentRevPart-1];
        res.send({resultCode: 0, currentReviewsPart, averageRating, totalReviewsCount}); 
    } catch (error) {
        res.status(500).json({ resultCode: 1, message: 'Что-то пошло не так, попробуйте еще раз!'});
        console.log(error);
    }
});

//  /api/home
//Post new Review 
router.post('/', 
async (req, res) => {
    try {   
        //Постим и сохраняем новый отзыв
        const { rate, name, content, publicationDate } = req.body.reviewFormData;
        const review = new Review({ rate, name, content, publicationDate });
        await review.save();
        res.send({resultCode: 0});
    } catch (error) {
        res.status(500).json({ resultCode: 1, message: 'Ошибка: отзыв не сохранен, попробуйте еще раз'});
        console.log(error);
    }
});

module.exports = router;