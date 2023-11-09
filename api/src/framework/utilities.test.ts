import { getServiceName } from './utilities';

describe('utilities', () => {
  describe('getServiceName', () => {
    it('returns the correct service name', () => {
      const path = '/track';

      const actual = getServiceName(path);

      expect(actual).toBe('track');
    });

    it('returns the correct service name from path with param', () => {
      const path = '/track/:id';

      const actual = getServiceName(path);

      expect(actual).toBe('track');
    });

    it('returns the correct service name with name that includes forward slashes', () => {
      const path = '/audio/track';

      const actual = getServiceName(path);

      expect(actual).toBe('audio/track');
    });
  });
});
