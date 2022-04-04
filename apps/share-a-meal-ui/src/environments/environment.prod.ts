import { default as env } from '../../../../package.json'

export const environment = {
  production: true,

  SERVER_DOCS_URL: 'https://shareameal-api.herokuapp.com/docs',
  SERVER_API_URL: 'https://shareameal-api.herokuapp.com/api/',

  IDENTITY_API_DOCS_URL: 'http://localhost:3030/docs',
  IDENTITY_API_URL: 'http://localhost:3030/api/',

  appVersion: env.version
}
