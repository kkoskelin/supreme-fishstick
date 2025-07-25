# README

This site will be deployed to tiiny.host on a temporary basis.

madisonswimming.com is hosted on WIX
Features we want:
<https://reachforthewall.org/swimmer-stats/>
<https://reachforthewall.org/event-stats/>

Let's try an iframe with react app.

* datatables for react
* ability to filter on all fields
* ability to specify sort, print, export

TODO:

* database configuration
* administrative options for entering historical data

## Engineering setup

### Toolchain Installs

* Volta -- <https://volta.sh/>

For VSCode users:

* ESLint
* Error Lens
* GitLens -- Git supercharged
* PostCSS Language Support -- <https://marketplace.visualstudio.com/items?itemName=csstools.postcss>
* Sort lines
* Tailwind CSS Intellisense

Modify your editor's `settings.json` file to include the following preferences:

```json
    "editor.formatOnSave": true,
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
        "source.fixAll.eslint": true,
    },
```

### Install Dependencies

`npm i`

## Application startup

`npm start`

## Prepare the bundle for distribution

### Convert the CSV to JSON

Cleaning up the 2024 spreadsheet:

```sh
mv ~/Downloads/2025\ Tri\ County\ Swim\ Results\ -\ Tri-County.csv ./src/fixtures/2025.csv
tail -n +2 ./src/fixtures/2025.csv | sed -e 's/,Tri/\/2025,Tri/g' > temp.csv
mv temp.csv ./src/fixtures/2025.csv
```

You may need to edit the JS file below for your desired year.

```sh
pushd src/fixtures
node csvtoJson.js 20*csv
popd
```

### Deploy to Github Pages

Currently the .github/workflows/static.yml will build and deploy code pushed to `main` automatically.
The site is then visible at <https://kkoskelin.github.io/supreme-fishstick/>

### Build the bundle into a ZIP file for deployment anywhere

```sh
npm run clean
npm run build  (or build:gh)
zip dist/index.zip dist/*
```

Then upload to tiiny.host or whatever free hosting site you wish.

## Serverless

* Set up AWS Credentials: <https://www.serverless.com/framework/docs/providers/aws/guide/credentials/>
* Video walkthrough: <https://youtu.be/KngM5bfpttA>

To get serverless template engine thing working:
 `brew install serverless`

From the folder `api/`:

* `sls deploy`
* `sls remove`
* `serverless info`      View deployed endpoints and resources
* `serverless invoke`    Invoke deployed functions
* `serverless --help`    Discover more commands

## Running Tests

Jest Tests:

```
npm run test
```

Run a single jest test file:

```
npx jest path/to/myFile.test.ts
```

# Application Functionality Requests

## Search for a Swimmer, filter on attributes

First, we want to search for a particular swimmer by their NAME (a substring) and TEAM affiliation.
Additionally, we would like the ability to optionally restrict the year of the records.
Other filters would be by stroke or by event (each of which has a specific gender, stroke, and distance).

Second, we would like to be able to search for swimmer rankings for a particular event.

* Choose an EVENT (only required criteria); this implicitly requires choice of gender, stroke, and distance.
