# Nuxt 3 TypeScript Scaffold

This is a project scaffold for a Nuxt 3 + Typescript application. Scaffolds are meant to help us to start new projects, Nuxt 3 is a frontend + backend ("fullstack") framework that natively enforces typed JavaScript ("TypeScript"). Nuxt 3 is based on Vue 3.

This scaffold has the following features:
- (slim) docker ready
    ```sh
    > docker build -t nuxt3-app .
    > docker run -p 3000:3000 --rm nuxt3-app
    # visit `localhost:3000`
    ```
- Storybook support:
    ```sh
    > npm i
    > npm run storybook
    ```
- Linting & Formatting (`npm run lint`)
    - `npm run lint:style`: eslint for formatting & linting
        - `npm run lint:style -- --fix`: Autofix styles and lints where possible
    - `npm run lint:types`: typescript typechecking
- Testing & Code Coverage & Component Snapshots
    - `npm run test`: Run tests once, report results and coverage
        - `npm run test:watch`: Run tests and watch file changes, run tests for changed files
        - `npm run test -- -u`: Update component snapshots after components changed
        - `npm run test -- -t "some test-text"`: Run all tests with `some test-text` in their `test(...)` description
    - `@testing-library/vue` for easy and best-practice component tests, [see example here](https://testing-library.com/docs/vue-testing-library/examples)
    - breakpoint debugging in VS Code
- CSS usable without imports
    - Utility & Styling: TailwindCSS 3
    - Components: Ant Design Vue with component-auto-import
- Miscallaneous
    - Pre-commit checking (husky) & fixing (lint-staged)
    - drone CI pipeline to linting, testing, typing checks
    - nuxt-link support in tests and storybook
    - debug sql database queries by setting `logging: true` in the `database/index.ts`: This will show you a live log of all ongoing database queries which is super helpful to debug database problems

## Local Setup

If this is not the first time you use `npm` / `node` v16 on your setup:
```sh
> npm i

# development mode with hot reloading
> npm run dev

# component based development via storybook
> npm run storybook

# testing via vitest
> npm run test
> npm run test:watch  # watch tests

# run a specific test by text
> npm run test -- -t "text of test"

# update html screenshots of components
> npm run test -- -u

# linting & type checks
> npm run lint
> npm run lint -- --fix  # autofix lints

# breakpoint debugging (zero-config in VS Code)
# 1. Open the command palette (CMD / CTRL + SHIFT + P)
# 2. Select "Debug: JavaScript Debug Terminal"
# 3. Run any `npm` command inside `app/`, e.g.: `npm run test`
# 4. Your code editor colors should change a bit (e.g.: to orange) while executing the command, the left side should show deep execution insights
# 5. Set breakpoints (click left of line count in editor - red dot should appear) - the debugger will automatically work and stop at them and allow you to inspect variables
> npm run test  # also works for more specific tests via `-t` option (see above)
```

### First time setup

If this is the first time you run a `npm` / `node` app on your setup:

1. Install the `node` version manager `nvm` by running:
    ```sh
    > curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    ```
2. Install the required `node` and `npm` version:
    ```sh
    # uses `.nvmrc` to install required version
    > nvm install
    ```
3. Use the required `node` and `npm` version:
    ```sh
    # uses `.nvmrc` to use required version
    > nvm use

    # ALTERNATIVE: make node 16.14.2 your default node version (version copied from `.nvmrc`, check there for most up to date node version)
    > nvm alias default 16.14.2
    ```
4. Install a code editor (recommended: VS Code), [get it here](https://code.visualstudio.com/)
5. Uninstall or disable the old Vue VS Code extension `Vetur`, else conflicts may arise between `volar` and `Vetur`
6. Install the `volar` extension to support `vue`, `nuxt` and `typescript` development help
    - for vs code: https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar
    - sublime LSP: https://github.com/sublimelsp/LSP-volar
    - vim: https://github.com/yaegassy/coc-volar
7. Enable "take over mode" for volar for this project.
    - documented here: https://github.com/johnsoncodehk/volar/discussions/471
    - for VS Code:
        1. Run (CMD/CTRL + SHIFT + P): Extensions: Show Built-in Extensions
        2. Find "TypeScript and JavaScript Language Features"
        3. Right click and select "disable for workspace"
        4. Reload the editor
        5. A message "Take over mode enabled" (or similar) should appear
8. Go to the [top of this section](#local-setup) and execute commands
