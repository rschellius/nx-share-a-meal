// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { default as env } from '../../../../package.json'

export const environment = {
  production: false,

  MEAL_DOCS_URL: 'http://localhost:3000/docs',
  MEAL_API_URL: 'http://localhost:3000/api/',

  AUTH_API_DOCS_URL: 'http://localhost:3030/docs',
  AUTH_API_URL: 'http://localhost:3010/api/',

  USER_API_DOCS_URL: 'http://localhost:3030/docs',
  USER_API_URL: 'http://localhost:3020/api/',

  appVersion: env.version
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
