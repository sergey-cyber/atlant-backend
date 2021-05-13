const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/hostelData', require('./routes/hostel.data.routes'));
app.use('/api/home', require('./routes/home.page.routes'));

const PORT = config.get('port') || 5000;
//В конфиге хранятся константы в файле default.js 
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex: true   
        })
    } catch (error) {
        console.log('server error', error.message);
        process.exit(1)  //Выход из процесса если что-то пошло не так
    }
}

start();


app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
