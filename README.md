![sidebase](./.github/sidebase.png)

# sidebase

> With **sidebase** every new project feel like a fun side-project while scaling to production.

sidebase is a modern, best-practice, batteries-included fullstack-app starter based on Nuxt 3 and TypeScript.

## Quick start

1. Clone the repository
    ```sh
    git clone https://github.com/sidestream-tech/sidebase my-app
    ```
2. Go into the `app/` directory
    ```sh
    cd my-app/app
    ```
3. Install the dependencies
    ```sh
    npm i
    ```
4. Start developing (with database, backend, API, ... running) at [localhost:3000](http://localhost:3000)
    ```sh
    npm run dev
    ```

## Features

The key features are:
- 🎒 **Fullstack**: Develop frontend and backend in a single TypeScript code base
    - Data base models, migrations and queries via [`TypeORM`](https://typeorm.io/),
    - Data-validation via [`zod`](https://github.com/colinhacks/zod),
    - Linting via [`eslint`](https://eslint.org/),
    - Testing, Test UI, component snapshotting via [`vitest`](https://vitest.dev/),
    - API tests via [`supertest`](https://github.com/visionmedia/supertest),
    - Code coverage via [`c8`](https://github.com/bcoe/c8),
    - Component stories via [`histoire`](https://histoire.dev/),
    - CSS utiltities via [`TailwindCSS`](https://tailwindcss.com/),
    - CSS components via [`Ant Design Vue`](https://antdv.com/components/overview),
    - Type checking in script and template via [`Volar / vue-tsc`](https://github.com/johnsoncodehk/volar)
- 🏎️ **Fast to code**: Database, example tests, example components and example pages are all there for you to fill out
- 🐛 **Fewer bugs**: Strong data-validation using `zod` to validate all transferred data, fully typed API-routes, strict DB models via `TypeORM`
- 😊 **Easy to use**: Designed to follow best practices and to be ready-to-go for development, without additional dev-dependencies like `docker` that make it hard to get started
- 🚀 **Ready for launch**: Github Actions CI, Dockerfile, easy switch to most popular databases are all there, out of the box ([get in touch if you're missing something](https://github.com/sidestream-tech/sidebase/issues/new/choose))

To facilitate this `sidebase` bootstraps a nuxt 3 project that permits developing a backend and a frontend using just Nuxt 3 with overarching TypeScript support. We want to show the world how enjoyable end-to-end typescript programming can be, displacing the myth that JS/TS-backends are no good. This starter solves a lot fo the "real-world" problems that occur after you start using Nuxt or any other framework: How to write backend tests? How to write component tests? How to calculate test coverage? How to integrate a database? How to build a docker image? ...?

If you have any problems with this project (e.g., setting it up on your PC) [open an issue](https://github.com/sidestream-tech/sidebase/issues/new/choose) and we'll figure it out together with you 🎉

## Commands and Further Documentation

You can also:
- `npm run story` for isolated component development using `histoire` (see [`ShowCase.story.vue`](./app/components/example/ShowCase.story.vue) as example)
- `npm run test` for testing (see [`ShowCase.test.ts`](./app/components/example/ShowCase.test.ts) as example)
    - `npm run test -- -u` to update the component snapshots
    - `npm run test -- -t "test describe text"` to run a specific test
    - `npm run test:ui` to start the [vitest UI](https://vitest.dev/guide/ui.html)
- `npm run lint` for linting using `eslint`
- `npm run build` for bundling using `vite`

Have a look at the more detailed [readme of the fullstack app](./app/README.md) to see a broader, more in-depth explanation and documentation of commands.
