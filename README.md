
## Introduction:

Node.js CLI app that is responsible for scaffolding React/Next.js
project with headless CMS, data fetching, styling, reusable
components, and pre-commit hooks.

</br>

## List of dependencies:

- [inquirer](https://www.npmjs.com/package/inquirer) for complex input prompts.
- [arg](https://www.npmjs.com/package/arg) to parse our CLI arguments
- [listr](http://npm.im/listr) for progress lists.
- [ncp](https://www.npmjs.com/package/ncp) Asynchronous recursive file & directory copying.
- [esm](https://www.npmjs.com/package/esm) ECMAScript module loader.

</br>

## List of features :

- Installing `Next.js` app.
- Restructuring files system.
- Add layouts and generic components.
- Setup styling library with `SASS` for typography, colors, and media queries.
- Add `TailwindCSS` as a utility-first CSS framework.
- Setup `Contentful CMS` by installing dependencies, creating GraphQl client, automating types generation for content models using `graphql-codegen`, and adding utilities to map rich text JSON formatted to reusable typography components.
- Setup path aliases in `tsconfig`.
- Setup `eslint` and pre-commit hooks with `Husky`.
- Create env variables public config using `dotenv`.

</br>

## List of commands:

- `-y / --yes` : Skip prompts and init project with TS and CTF
- `-t / --typescript` : Init Typescript
- `-c / --contentful` : Init Contentful

</br>

## Project structure:

- bin :
    
     —  CLI entry point
    
- src :
    
     — CLI logic
    
- templates :
    
    — Language-specific templates
    
</br>

## How to setup:

Clone this repo, then `cd` into it and run `npm link` to create a global symlink to this project. 
The output should be something like this:

```jsx
[ '/usr/local/Cellar/node/11.6.0/bin/node',
  '/Users/sobhi_alkhuder/dev/create-sl-app/bin/create-sl-app' ]
```

**Note**: paths will be different for you depending on where your project lies and where you have `Node.js` installed. 

Then you will be able to run `create-sl-app` globally.

</br>

## What needs to be done:

1. Create `.env.local` file and add the needed credentials.
2. Add fonts to the public folder and load them in global.css.

</br>

## License:

MIT

</br>

## Authors:
[Sobhi Al Khuder](https://github.com/Sob7i)</br>
[Djimo van Berlo](https://github.com/Djimovanberlo)</br>
