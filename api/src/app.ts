import path from 'path';
import { FastifyReply, FastifyRequest } from 'fastify';
import multipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import { createApp } from '@/framework';
import { services } from './service';
import { db } from './db';

const app = createApp();

(async () => {
  db.init();

  app.register(fastifyCors)
  app.register(multipart, { attachFieldsToBody: true });

  const rootDirectory = path.resolve(__dirname, '..');

  app.register(fastifyStatic, {
    root: path.join(rootDirectory, 'public', 'files'),
    prefix: '/files/',
  });

  app.get('/audio/:filename', function (req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as any;

    reply.sendFile(params.filename);
  });

  app.registerServices(services);

  app.setErrorHandler(function (error: any, _, reply) {
    const status = error.statusCode ?? 500;
    const message = error.message ?? 'An unexpected error occured';

    reply.status(status).send({ message });
  });
})();

export { app };
