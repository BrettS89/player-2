import { Service } from '@/framework';
import { Provider } from './provider';

const name = 'v1/file';
const path = `/${name}`;

export const file = new Service({
  provider: new Provider(name),
  schemas: {},
  name,
  path,
  hooks: {},
});
