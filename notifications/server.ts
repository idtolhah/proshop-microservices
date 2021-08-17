import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { notFound, errorHandler } from './common/middleware/errorMiddleware'
import { natsWrapper } from './config/nats-wrapper';
import notificationRoutes from './routes/notificationRoutes'
import { OrderCreatedListener } from './events/listeners/order-created-listener'
import { OrderPaidListener } from './events/listeners/order-paid-listener'
import { OrderProcessedListener } from './events/listeners/order-processed-listener'
import { OrderShippedListener } from './events/listeners/order-shipped-listener'
import { OrderReceivedListener } from './events/listeners/order-received-listener'
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener'
import { OrderCompletedListener } from './events/listeners/order-completed-listener'
import { OrderReturnedListener } from './events/listeners/order-returned-listener'
import cors from 'cors'

const start = async () => {

  console.log('notifications starting up.....');

  dotenv.config()

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderPaidListener(natsWrapper.client).listen();
    new OrderProcessedListener(natsWrapper.client).listen();
    new OrderShippedListener(natsWrapper.client).listen();
    new OrderReceivedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();
    new OrderCompletedListener(natsWrapper.client).listen();
    new OrderReturnedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  const app = express()
  // app.use(cors(corsOptions))

  if (process.env.NODE_ENV === 'development') {
    // app.use(morgan('dev'))
  }

  app.use(express.json())

  app.use('/api/notifications', notificationRoutes)


  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

  app.use(notFound)
  app.use(errorHandler)

  const PORT = process.env.PORT || 5000

  app.listen(
    PORT, () =>
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  )
}

start();