import { Service } from '@/framework';
import { file } from './file';
import { track } from './track';

export const v1Services: Service[] = [
  file,
  track,
];
