import express, { Application } from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';

connectDB();

const app: Application = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running'));
