import express, { Application, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes';
import connectDB from './config/db';

connectDB();

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('API is running...');
});

app.use(userRoutes);

app.listen(5000, () => console.log('Server running'));
