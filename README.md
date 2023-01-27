# sidebase

<a href="https://github.com/sidebase/sidebase/actions?query=branch%3Amain+event%3Apush"><img src="https://github.com/nuxt/framework/workflows/ci/badge.svg?branch=main&event=push" alt="CI Status"></a>
[![GitHub stars](https://badgen.net/github/stars/sidebase/sidebase)](https://GitHub.com/sidebase/sidebase/)
[![License][license-src]][license-href]
[![Follow us on Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/sidebase_io)
[![Join our Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/NDDgQkcv3s)

> sidebase is a web development kit to build production ready fullstack Nuxt 3 apps quickly. sidebase relies on modern, fully-typed and best-practice technology to achieve this goal. sidebase embraces the fullstack TypeScript approach to app development: Code sharing between client and server, reduced learning curve for engineers and code-reuse across apps are things we love about this approach. That said, you can also use sidebase to build client-side only apps.

## Visit [sidebase.io/sidebase](https://sidebase.io/sidebase) for quick-start, docs, guides and more!

To get started, run:
```sh
npm create sidebase@latest
```

And you are ready to go! The sidebase CLI will guide you through the process. Afterwards, or if you still want to know more, read [the documentation](https://sidebase.io/sidebase/welcome/stacks) to continue.

![sidebase](https://raw.githubusercontent.com/sidebase/core/main/.github/sidebase.png)

## Features

With sidebase you can build production ready, robust, maintainable, fullstack applications:
- 🎒 **Fullstack**: Develop frontend and backend in a single TypeScript code base
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
