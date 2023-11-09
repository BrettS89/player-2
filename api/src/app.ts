import multipart from '@fastify/multipart';
import { createApp } from '@/framework';
import { services } from './service';
import { db } from './db';

const app = createApp();

(async () => {
  db.init();

  app.register(multipart, { attachFieldsToBody: true });

  app.registerServices(services);

  app.setErrorHandler(function (error: any, _, reply) {
    console.log(error);
    const status = error.statusCode ?? 500;
    const message = error.message ?? 'An unexpected error occured';

    reply.status(status).send({ message });
  });
})();

export { app };
