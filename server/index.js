// IMPORTS 
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();

// USING MIDDLEWARES OF EXPRESSJS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads')); // used for serving images to frontend

// CREATING AND CONNECTING DB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('connection established');
})
.catch((err) => {
    console.log(err);
});

const ENVIRONMENT = process.env.ENVIRONMENT;
const PORT = process.env.PORT_NO;



// STARTING A SERVER
(ENVIRONMENT == 'development') ? 
    app.listen(8000, () => {
        console.log('Server started on PORT 8000');
    })
    : 
    app.listen(PORT, () => {
        console.log(`Server started on PORT ${PORT}`);
    });

// -----------------------
// AUTHORIZATION MIDDLEWARE 
const authMiddleware = require('./middlewares/authMiddleware/authMiddleware');

// API ROUTES
const adminRoute = require('./routes/adminRoute/adminRoute');
app.use('/api/v1/admin', adminRoute);

const authRoute = require('./routes/authRoute/authRoute');
app.use('/api/v1/auth', authRoute);

const teacherRoute = require('./routes/teacherRoute/teacherRoute');
app.use('/api/v1/teacher', authMiddleware, teacherRoute);

const feedbackRoute = require('./routes/feedbackRoute/feedbackRoute');
app.use('/api/v1/feedback', feedbackRoute);


