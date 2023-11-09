import { config } from '../config';

export const get = (key: string): any => {
  //@ts-ignore
  return config[key]
};
