import { config } from 'dotenv';
config();
import { app } from './app';

app.listen({
  port: process.env.PORT ?? 4005 as any,
  host: '0.0.0.0',
});
