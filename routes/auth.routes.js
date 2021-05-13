const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); //Модуль позволяет хэшировать пароли и сравнивать их
const jwt = require('jsonwebtoken'); //Модуль для авторизации пользователя
const config = require('config');
const {check, validationResult} = require('express-validator'); //Модуль для валидации пароля и мэйла
const router = Router();

//  /api/auth/register
router.post('/register', 
[
    check('email', 'Некорректный Email').isEmail(), //Валтдация Email, проверка на корректность
    check('password', 'Миннимальная длина пароля 6 символов').isLength({min: 6})
],
async (req, res) => {
    try {   
        const errors = validationResult(req);
        if(!errors.isEmpty()) { //Если емэйл и пароль не проходят валидацию, то отправляем ошибку на фронтэнд
            return res.status(400).json({
                errors: errors.array(), //Приводим ошибки к массиву
                message: 'Некорректные Email или пароль'
            })
        }
        const {email, password} = req.body;
        const condidate = await User.findOne({email}); 
        if(condidate) {
            return res.status(400).json({message: 'Пользоатель с таким Email уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12); //Хэшируем пароль
        const user = new User({email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: 'Регистрация успешно завершена'});

    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуте еще раз'})
    }
});

//  /api/auth/login
router.post('/login', 
[
    check('email', 'Неверный Email или пароль').normalizeEmail().isEmail(),
    check('password', 'Неверный Email или пароль').exists() //Exists значить что пароль должен существовать
],
async (req, res) => {
    try {   
        const errors = validationResult(req);
        if(!errors.isEmpty()) { //Если емэйл и пароль не проходят валидацию, то отправляем ошибку на фронтэнд
            return res.status(400).json({
                errors: errors.array(), //Приводим ошибки к массиву
                message: 'Некорректные Email или пароль'
            })
        }

        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            res.status(400).json({message: 'Пользователь не найден'});
        }

        const isMatchPassword = bcrypt.compare(password, user.password); //Сравниваем пароль, ришедший с фронта с хэшированным паролем в базе
        if(!isMatchPassword) {
            return res.status(400).json({message: 'Неверный Email или пароль'});
        }

        const token = jwt.sign(
            {userId: user.id},  //Данные для токена
            config.get('jwtSecret'),  //Секретный ключ из фала default.json
            {expiresIn: '1h'} //Время существования токена
        );
        res.json({token, userId: user.id});  //Отправка данных пользователя с токеном на фронт

    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуте еще раз'})
    }
})

module.exports = router;