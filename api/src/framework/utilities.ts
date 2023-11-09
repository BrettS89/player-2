export const getServiceName = (routerPath: string) => {
  const paramRemoved = routerPath.includes(':')
    ? routerPath.split(':')[0]
    : routerPath;

  const firstSlashRemoved = paramRemoved[0] === '/'
    ? paramRemoved.slice(1)
    : paramRemoved;

  return firstSlashRemoved[firstSlashRemoved.length - 1] === '/'
    ? firstSlashRemoved.slice(0, firstSlashRemoved.length - 1)
    : firstSlashRemoved;
};
