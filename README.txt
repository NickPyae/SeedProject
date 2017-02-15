For Angular 2 Unit Testing and End to End Testing,

1) Navigate into the folder (in the command line / terminal)
2) Run "npm install" to install all required dependencies.
3) Run "npm run build" to run the development build script => Keep this process running! It recompiles your files upon changes.
4) Run "npm start" in a new command line / terminal window => Keep this process running as well, it's your NodeJS server. 
5) Run "npm run build:prod" for production. All Angular 2 files will be compiled using Ahead-of-Time.

For Node.js Unit Testing,

1) Run "npm run mocha".

Angular 2 CLI,

1) Run "ng generate class my-new-class" to add a class to your application
2) Run "ng generate component my-new-component" to add a component to your application
3) Run "ng generate directive my-new-directive" to add a directive to your application
4) Run "ng generate enum my-new-enum" to add an enum to your application
5) Run "ng generate module my-new-module" to add a module to your application
6) Run "ng generate pipe my-new-pipe" to add a pipe to your application
7) Run "ng generate service my-new-service" to add a service to your application

Available options
--flat: boolean, default true, generate directive files in src/app instead of src/app/yourfolder
--prefix: boolean, default true, use prefix specified in angular-cli.json in directive selector
--spec: boolean, default true, generate spec file with unit test

Generate without unit test
--spec=false