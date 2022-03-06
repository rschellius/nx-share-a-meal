import { default as env } from '../../../../package.json'

export const environment = {
  production: true,

  SERVER_DOCS_URL: 'https://shareameal-api.herokuapp.com/docs',
  SERVER_API_URL: 'https://shareameal-api.herokuapp.com/api/',

  appVersion: env.version
}
