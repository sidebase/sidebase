# sidebase

<a href="https://github.com/sidebase/sidebase/actions?query=branch%3Amain+event%3Apush"><img src="https://github.com/nuxt/framework/workflows/ci/badge.svg?branch=main&event=push" alt="CI Status"></a>
[![GitHub stars](https://badgen.net/github/stars/sidebase/sidebase)](https://GitHub.com/sidebase/sidebase/)
[![License][license-src]][license-href]
[![Follow us on Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/sidebase_io)
[![Join our Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/9MUHR8WT9B)


> sidebase is a modern, best-practice, batteries-included fullstack-app starter based on Nuxt 3 and TypeScript. Creating production-ready fullstack Typescript projects becomes a breeze!

## Quick start

1. Use the official [`nuxi`-cli](https://nuxt.com/docs/api/commands/init#nuxi-init) to start:
    ```sh
    npx nuxi init -t community/sidebase
    ```
2. Go into the `nuxt-sidebase/` directory
    ```sh
    cd nuxt-sidebase
    ```
3. Install the dependencies
    ```sh
    npm i
    ```
4. Start developing (with database, backend, API, ... running) at [localhost:3000](http://localhost:3000)
    ```sh
    npm run dev
    ```

Visit the documentation for further information on [getting started, adding authentication, adding session management and more](https://sidebase.io/sidebase/documentation)

## Features

The key features are:
- 🎒 **Fullstack**: Develop frontend and backend in a single TypeScript code base
    - Fullstack [`Vue 3`](https://vuejs.org/) + [`Nuxt 3 (stable)`](https://nuxt.com/),
    - Database models, migrations, queries and easy DB-switching via [`Prisma`](https://prisma.io/),
    - In-memory development SQL-database via [`sqlite3`](https://www.sqlite.org/index.html),
    - Linting via [`eslint`](https://eslint.org/),
    - Test management, Test UI, component snapshotting via [`vitest`](https://vitest.dev/),
    - Component tests via [`test-library/vue`](https://testing-library.com/),
    - API tests via the [`@nuxt/test-utils`](https://nuxt.com/docs/getting-started/testing#testing),
    - Code coverage via [`c8`](https://github.com/bcoe/c8),
    - CSS utiltities via [`TailwindCSS`](https://tailwindcss.com/),
    - CSS components via [`Naive UI`](https://www.naiveui.com/),
    - Type checking in script and template via [`Volar / vue-tsc`](https://github.com/johnsoncodehk/volar)
- 🏎️ **Fast to code**: Database, example tests, example components and example pages are all there for you to fill out
- 🐛 **Fewer bugs**: Strong data-validation using `Prisma` to validate all data coming into the database at runtime
- 😊 **Easy to use**: Designed to follow best practices and to be ready-to-go for development, without additional dev-dependencies like `docker` that make it hard to get started
- 🚀 **Ready for launch**: Github Actions CI, Dockerfile, easy switch to most popular SQL-databases are all there, out of the box ([get in touch if you're missing something](https://github.com/sidebase/sidebase/issues/new/choose))

To facilitate this `sidebase` bootstraps a nuxt 3 project that permits developing a backend and a frontend using just Nuxt 3 with overarching TypeScript support. We want to show the world how enjoyable end-to-end typescript programming can be, displacing the myth that JS/TS-backends are no good. This starter solves a lot of the "real-world" problems that occur after you start using Nuxt or any other framework: How to write backend tests? How to write component tests? How to calculate test coverage? How to integrate a database? How to build a docker image? ...?

If you have any problems with this project (e.g., setting it up on your PC) [open an issue](https://github.com/sidebase/sidebase/issues/new/choose) and we'll figure it out together with you 🎉

## License

[MIT](./LICENSE)


<!-- Badges -->

[license-src]: https://img.shields.io/npm/l/@sidebase/nuxt-session.svg
[license-href]: https://npmjs.com/package/@sidebase/nuxt-session
