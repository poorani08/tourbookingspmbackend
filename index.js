import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
// import User from './models/User.js';
// import Tour from './models/Tour.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
    origin: true,
    credentials: true
};

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

app.get('/admin/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
});

app.get('/admin/tours', async (req, res) => {
    try {
        const tours = await Tour.find({});
        res.json({ data: tours });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch tours' });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
