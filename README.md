# Frontend workflow

This repository contains a starterkit for developing a frontend application/website. It contains code linting (with Prettier, TSLint and StyleLint), TypeScript, PostCSS with SASS (that has Bulma.io framework initialized) and generation of Favicons. The build is based on Webpack 4.

You can preview the output here: [https://trusting-perlman-3c2ee5.netlify.com](https://trusting-perlman-3c2ee5.netlify.com). There you'll find included JS components and you can do your own audit checks on this site to compare the performance with other projects.

The focus of this workflow is performance:

- By using a css-only framework, you are free to choose **whatever JS Framework you want**. [1]
- By inlining critical CSS/JS and async loading the rest, you'll get a fast **First Meaningful Paint**.
- By using linting tools for CSS and JS, everybody follows a **consistent code style**.
- By using TypeScript, you can check your code on type errors and more.
- By generating Favicons automatically, you don't need to spend hours making all sizes of icons for all possible usecases.
- By using a PWA friendly approach, your app will also work **offline by default** and will **cache assets**.
- **Drupal 8 ready**: included (but not loaded by default) JavaScript components automatically check if they are loaded in Drupal environment and will **attach to DrupalBehaviors** accordingly.
- Code splitting ready, you can use **dynamic imports by default**.

If you don't like a feature, you can disable it and write another one.

[1] However, there are some JavaScript components included, that are written for our projects and are handy tools, but here again, you are free to not use them.
If you want to use them, you can import them into your bundle.

By default they are loaded as separate files, you can un-comment them (in `webpack.common.js`) if you do not wish to use them.

## Install

Download this repository to the root of the frontend of your project.
Make sure you have the correct Node version installed. There is `.nvmrc` available for your convenience. Run in this folder:

```bash
nvm use
```

Then install all dependencies:

### NPM

```bash
npm install
```

or

### Yarn

```bash
yarn
```

## Usage

### Developing

Use `yarn start` to start the webpack dev server, you can now start developing, the browser will be automatically reloaded on any code/asset change. You can add the HTML in `index.html`.

For examples on how to use TS within this workflow, please read `TypScript usage examples`.

#### TypeScript

This starter kit is initialized with TypeScript. You can change the settings in `.tsconfig.json`. Any typings that you will need, you can add in `src/typings`.

#### CSS (w/ PostCSS and SCSS)

This starterkit is preset with [Bulma css framework](https://bulma.io). You can use it or you can remove it in index.scss. You can also use normal `.css` files in your project, they will be bundled too.

There are some PostCSS plugins already preinstalled. You can change PostCSS setting and add/remove plugins in `postcss.config.js`.

- [postcss-short](https://github.com/jonathantneal/postcss-short)
- [postcss-utilities](https://github.com/ismamz/postcss-utilities)
- [postcss-easing-gradients](https://github.com/larsenwork/postcss-easing-gradients)
- [@csstools/postcss-sass](https://github.com/jonathantneal/postcss-sass)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables)
- [cssnano](https://cssnano.co/)

**Build performance tip**: Do not use `.scss` if it's not needed, with PostCSS plugins you can do a lot of stuff. If you need Bulma mixins and colors, you should use `.scss` then.

#### Prettier/Editorconfig

There is a Prettier integration for your code style consitency. You can change its settings in `.prettierrc.json`. There is also an `.editorconfig` available to help you and your IDE to set the correct settings for code style consistency.

#### Images

Images are automatically optimized when creating a production build. No optimizations are done when using it in development mode.
Favicons/manifest files are also generated on production build only.

### Linting

You also have some linting tasks available:

- `yarn lint:js` will lint all TypeScript files with TSLint. You can change options of the linter in `.tslint.json`.
- `yarn lint:css` will lint all (s)css with StyleLint. You can change options of the linter in `.stylelintrc.json`.
- `yarn lint` will run both lint tasks

#### Linting in VSCode

To help you with linting, you can install these extensions for VSCode:

- EditorConfig for VS Code
- ESLint
- Prettier
- stylelint
- TSLint

### Components

There are some JavaScript components available for your ease (We have included them as we reuse them a lot). There are 2 ways of using them.

1. **(Easy/Not so performant)**: Un-comment them from entry points from `webpack.common.js`. This way they are automatically initialized and are separate from the main bundle. This way you can load them with Drupal dependencies on specific pages/modules. They are also added in the built `.html` file and they just work.
2. **(More work, but most performant)**: You can import them (not the `index.ts` file) manually in `Site.ts` and attach them. This way, they will be bundled in main bundle so they will require only 1 network request.

```ts
import {ResponsiveNavbar} from './../vendor/bulma/responsive-navbar/ResponsiveNavbar'
// ...
ResponsiveNavbar.attach()
```

We suggest that you bundle them in `Site.ts` manually. If you have a big dependency that is not frequently used in the website, you can load it separately as a different entry point.

### Code splitting

This is a default webpack behavior, please read more information here: [https://webpack.js.org/guides/code-splitting/](https://webpack.js.org/guides/code-splitting/).

This is a basic example how you can use it:

```ts
// ./components/BigComponent.ts

export class BigComponent {
  constructor(name: string) {
    console.log(`big component initialized: ${name}`)
  }
}
```

```ts
// Site.ts

// ...
export class Site {
  constructor() {
    // ...
    this.initBigBundle()
  }

  private async initBigBundle(): Promise<void> {
    const {BigComponent} = await import(/* webpackChunkName: "bigcomponent" */ './components/BigComponent')
    const bigComponentInstance = new BigComponent('foo')
  }

  // ...
}
```

### Building

To create a production build, use `yarn build` (will lint code before) or use `yarn export` to create a build without linting the code.

#### Submodules

- **Favicons**: Will generate all icons and manifests for a PWA ready app.
- **CriticalCSS**: Will inline critical CSS, based on 3 viewports (Mobile, Tablet Horizontal, Desktop). You can edit the viewports.
- **SW Precache**: Will generate a service worker to cache resources of the website, thus allowing offline usage. (Depends on how you structure your app).
- **Async JS**: Will add `async` attribute on all scripts allowing them not to block the rendering.

### Lighthouse audits

With default configuration, the lighthouse audit gives us this score. However, to get the full pass on the audit you must follow it's guidelines when modifying the default settings and adding new CSS and/or JS. Some things you just can't automate fully. Look at the comments below how to fix those issues.

#### Desktop

- **Performance**: 100. Keep in mind: the more JS/CSS you write, the worse it can get. When adding images, you can use lazy loading for a better score.
- **Progressive Web App**: 100.
- **Accessibility**: 91. By using default Bulma css, the color contrast is not good enough, you can change the colors based on the project.
- **Best Practices**: 100.
- **SEO**: 100. Please consider reading SEO optimizations articles. Do not forget to add the correct attributes in HTML.

#### Mobile

Same metrics for mobile with default configuration except for:

- **Accessibility**: 89. Same error as on desktop.

### Options

Before creating a build, you should update the following files/settings:

- 1: Everything under `"config"` key in `package.json`. See table below.
- 2: Supported browsers can be changed under `"browserslist"` key in `package.json`.
- 3: Add an app icon in `src/favicon.png`. The build will create all possible icons for your app (iOS, Android, Browsers, ...). You should use a high enough resolution, minimum of 256x256px (preferably 1024x1024px).

| Name                | Type      | Default                               | Description                                                             |
| ------------------- | --------- | ------------------------------------- | ----------------------------------------------------------------------- |
| publicPath          | `string`  | /                                     | The final url where the app will be hosted. Only needed for production. |
| cacheId             | `string`  | frontend-workflow                     | Cache ID for Service Worker.                                            |
| name                | `string`  | Frontend Workflow                     | Name attribute to be inserted in manifest.json.                         |
| shortName           | `string`  | Frontend                              | Short name attribute to be inserted in manifest.json.                   |
| description         | `string`  | /                                     | Description attribute to be inserted in manifest.json.                  |
| author              | `string`  | /                                     | Author attribute to be inserted in manifest.json.                       |
| authorUrl           | `string`  | /                                     | Author URL attribute to be inserted in manifest.json.                   |
| theme               | `string`  | #00d1b2 (Default Bulma primary color) | Theme attribute to be inserted in manifest.json. (use with `#`)         |
| background          | `string`  | #ffffff                               | Background attribute to be inserted in manifest.json. (use with `#`)    |
| modules.favicons    | `boolean` | true                                  | Generate favicons on build. Only used in production build.              |
| modules.criticalCSS | `boolean` | true                                  | Inline Critical CSS. Only used in production build.                     |
| modules.swPrecache  | `boolean` | true                                  | Generate a Service Worker. Only used in production build.               |
| modules.asyncJS     | `boolean` | true                                  | Add `async` attribute to scripts. Only used in production build.        |

## Files to deploy

Webpack creates a bundle of your app in the folder `dist`. Therefore you can only deploy the build folder to production.
All other files you should NOT deploy to production as this can pose a security threat.

## TypScript usage examples

Here are some examples on how to use TS with this workflow.

### Import thirdparty library

If a library in question is written in TS or has TS support, you can just import it normally.

```ts
import EE from 'onfire.js'

export default class Canvas extends EE {
  constructor() {
    super()
  }
}
```

If a library has no support for TS, you'll need to search for types in npm repository for this library.

```bash
yarn add @types/jszip
```

```ts
import JSZip from 'jszip'
const zip = new JSZip()
```

If no types do not exist, you'll need to create one yourself and add it to folder `src/typings/`. Find information on how to do it here: [https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

## Requests and bugs

If you encounter bugs or have some requests, please create a ticket at [Github](https://github.com/ioulian/frontend-workflow/issues)

## TODO

- Do not stop script on build error

## Possible libraries/workflows

To keep the performance of the app up and the workload for developers low, this is a list of useful libraries/workflows:

- [js-cloudimage-responsive](https://github.com/scaleflex/js-cloudimage-responsive)

## Idea behind

This frontend framework started as a simple grunt task (a few years back) that minified CSS and JS. From there it grew into more advanced gulp tasks, that transpiled ES6, built SCSS, generated favicons and optimized images. Now this is rewritten for Webpack.

We use this workflow in our websites and projects and will update it with any new stuff (JS components/performance optimizations/...) that we think will make this workflow better and faster. This is an ongoing project, but maybe in the future we will create a new one when new technologies arrive.

There is no automatic upgrade path available as this is a boilerplate, however it should be possible for you to upgrade to a new version if you only keep `src/` from your project and update everything else. (Except if you change some settings in webpack config or any .json files, you'll need to update them too later).

## Copyright and license

Code copyright 2019 Yulian Alexeyev. Code released under [the MIT license](LICENSE).
