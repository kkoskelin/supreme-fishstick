# README

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
