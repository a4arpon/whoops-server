import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bookingRouter from './routes/booking.route';
import locationRouter from './routes/location.route';
import paymentRouter from './routes/payment.route';
import resortsRouter from './routes/resort.route';
import restaurantRouter from './routes/resturant.route';
import spotRouter from './routes/spot.route';
import tourPackageRouter from './routes/tourPackage.route';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.setupRoutes();
    this.connectToDatabase();
  }

  private configureMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(
      rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100,
      })
    );
    this.app.use(mongoSanitize());
    this.app.use(hpp());
  }

  private setupRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Server is up and running, waiting for human to handle! 😎',
      });
    });
    this.app.use('/api/locations', locationRouter);
    this.app.use('/api/locations/:id/resorts', resortsRouter);
    this.app.use('/api/locations/:id/restaurants', restaurantRouter);
    this.app.use('/api/locations/:id/spots', spotRouter);
    this.app.use('/api/locations/:id/tour_packages', tourPackageRouter);
    this.app.use('/api/bookings', bookingRouter);
    this.app.use('/api/payments', paymentRouter);
  }

  private connectToDatabase(): void {
    const URI = process.env.MONGO_URI as string;

    mongoose
      .connect(URI)
      .then(() => {
        const PORT = process.env.PORT || 4000;

        this.app.listen(PORT, () => {
          console.log(`✅ Server is up and running on port: ${PORT}`);
        });
      })
      .catch((error) => {
        console.error('❌ Error connecting to MongoDB:', error);
      });
  }
}

dotenv.config();

new App();
