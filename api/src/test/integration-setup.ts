import { db } from '@/db';

beforeAll(() => {
  db.init();
});

beforeEach(() => {
  db.clearDb();
});

afterAll(() => {
  db.clearDb();
});
