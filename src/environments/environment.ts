// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDvgmugA0QmVtGcT-9Hqvjp3vciIUSAs18",
    authDomain: "my-fitness-tracker-6cda3.firebaseapp.com",
    databaseURL: "https://my-fitness-tracker-6cda3.firebaseio.com",
    projectId: "my-fitness-tracker-6cda3",
    storageBucket: "my-fitness-tracker-6cda3.appspot.com",
    messagingSenderId: "387422463811"
  }
};
