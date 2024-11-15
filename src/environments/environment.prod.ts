import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://tu-url-de-produccion.com/' // URL del endpoint en producción
};
