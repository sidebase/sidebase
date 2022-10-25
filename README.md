# sidebase Nuxt3 starter

sidebase is a modern, best-practice, batteries-included fullstack-app starter based on Nuxt 3 and TypeScript.

## Quick start

1. Install the dependencies
    ```sh
    npm i
    ```
2. Start developing (with database, backend, API, ... running) at [localhost:3000](http://localhost:3000)
    ```sh
    npm run dev
    ```

If you have any problems with this project (e.g., setting it up on your PC) [open an issue](https://github.com/sidebase/sidebase/issues/new/choose) and we'll figure it out together with you 🎉

### Commands

Useful Commands for development, testing and deployment:
- Develop & Debug the app:
    - `npm i`: Install required dependencies
    - `npm run dev`: Start the fullstack app, including database
    - `npm run story`: Start `histoire` for component story based development of UI
- Linting & Formatting (`npm run lint`)
    - `npm run lint:style`: eslint for formatting & linting
    - `npm run lint:style -- --fix`: Autofix styles and lints where possible
    - `npm run lint:types`: typescript typechecking
- Testing & Code Coverage & Component Snapshots
    - `npm run test`: Run tests once, report results and coverage
        - `npm run test:watch`: Run tests and watch file changes, run tests for changed files
        - `npm run test -- -u`: Update component snapshots after components changed
        - `npm run test -- -t "some test-text"`: Run all tests with `some test-text` in their `test(...)` description
    - `npm run test:ui`: Run the vitest testing web UI for easier test interaction
    - `@testing-library/vue` for easy and best-practice component tests, [see example here](https://testing-library.com/docs/vue-testing-library/examples)
    - breakpoint debugging (zero-config in VS Code)
        1. Open the command palette (CMD / CTRL + SHIFT + P)
        2. Select "Debug: JavaScript Debug Terminal"
        3. Run any `npm` command inside `app/`, e.g.: `npm run test`
        4. Your code editor colors should change a bit (e.g.: to orange) while executing the command, the left side should show deep execution insights
        5. Set breakpoints (click left of line count in editor - red dot should appear) - the debugger will automatically work and stop at them and allow you to inspect variables
        6. Run a command that runs the code you set breakpoints at, e.g., `npm run test`
- Building & Deploying:
    - `npm run build`: Build the app for production
    - `npm run start`: Start the app in production (requires `npm run build` beforehand)
- CSS usable without imports
    - Utility & Styling: TailwindCSS 3
    - Components: Ant Design Vue with component-auto-import
- slim docker ready
    ```sh
    > docker build -t nuxt3-app .
    > docker run -p 3000:3000 --init --rm nuxt3-app
    ```
    - Note: Docker is not required for development or deployment - for development `sqlite3` is used and will launch automatically via `npm run dev` 🚀

## License

[MIT](./LICENSE)
