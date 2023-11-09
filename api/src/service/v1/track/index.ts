import { Service, DbProvider } from '@/framework';
import { schemas } from './schema';
import { hooks } from './hooks';

const name = 'v1/track';
const path = `/${name}`;

export const track = new Service({
  provider: new DbProvider(name),
  schemas,
  name,
  path,
  hooks,
});
