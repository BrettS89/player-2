import { config } from '../config';

export const set = (key: string, val: any) => {
  //@ts-ignore
  config[key] = val;
};
