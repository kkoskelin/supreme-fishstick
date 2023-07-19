# README

This site will be deployed to tiiny.site on a temporary basis.

madisonswimming.com is hosted on WIX

Let's try an iframe with react app.
* datatables for react
* ability to filter on all fields
* ability to specify sort, print, export

TODO:
* firebase configuration
* administrative options for entering historical data

## Engineering setup

### Toolchain Installs:
- Volta -- https://volta.sh/

For VSCode users:
- ESLint
- Error Lens
- GitLens -- Git supercharged
- PostCSS Language Support -- https://marketplace.visualstudio.com/items?itemName=csstools.postcss
- Sort lines
- Tailwind CSS Intellisense

Modify your editor's `settings.json` file to include the following preferences:
```
    "editor.formatOnSave": true,
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
        "source.fixAll.eslint": true,
    },
```

### Install Dependencies
    npm i

## Application startup
    npm start

## Serverless
Set up AWS Credentials: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
Video walkthrough: https://youtu.be/KngM5bfpttA

To get serverless template engine thing working:
 - brew install serverless

 - sls deploy
 - sls remove
 - serverless info      View deployed endpoints and resources
 - serverless invoke    Invoke deployed functions
 - serverless --help    Discover more commands

## Running Tests
Jest Tests:
```
npm run test
```
Run a single jest test file:
```
npx jest path/to/myFile.test.ts
```

## input validation
    Zod - https://javascript.plainenglish.io/validating-input-with-zod-in-typescript-6d0e04677123
