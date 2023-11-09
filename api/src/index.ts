import { config } from 'dotenv';
config();
import { app } from './app';

app.listen({
  port: process.env.PORT as any,
  host: '0.0.0.0',
});
