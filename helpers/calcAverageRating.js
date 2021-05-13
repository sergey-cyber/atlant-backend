//Принимает массив с объектами, в которых необходимо посчитать среднее значение ключей rate 
//Возвращает средний рейтинг
const calcAverageRating = (arr) => {
    let sum = 0;
    let numberOfReviews = 0;
    arr.forEach(review => {
        //Если в отзыве есть рейтинг то плюсуем его 
        if(review.rate) {
            sum += review.rate;
            numberOfReviews += 1;
        }    
    });
    const result = sum/numberOfReviews;
    //Округляем результат до одной цифры после запятой
    const roundedValue = Math.ceil(result*10)/10;
    
    return roundedValue;
}

module.exports = calcAverageRating; 