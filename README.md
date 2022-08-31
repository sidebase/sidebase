![sidebase](./.github/sidebase.png)

# SideBase

SideBase is a modern, best-practice, batteries-included fullstack-app starter based on Nuxt 3 and TypeScript.

The key features are:
- 🎒 **Fullstack**: Develop frontend and backend in a single TypeScript code base
- 🏎️ **Fast to code**: Database, example tests, example components and example pages are all there for you to fill out
- 🐛 **Fewer bugs**: Strong data-validation using `zod` to validate all transferred data, fully typed API-routes,
- 😊 **Easy to use**: Designed to be follow best practices and to be ready-to-go for development, without additional dependencies like docker
- 🚀 **Ready for launch**: Github Actions CI, Dockerfile, easy switch to most popular databases are all there, out of the box ([get in touch if you're missing something](https://github.com/sidestream-tech/sidebase/issues/new/choose))

Get started now:
```sh
# Clone the repository
> git clone https://github.com/sidestream-tech/sidebase my-app

# Go into the `app/` directory
> cd my-app/app

# Install the dependencies
> npm i

# Start developing (with database, backend, ...)
> npm run dev
```

Then visit [localhost:3000](http://localhost:3000) to see the web-app. It will already be connected to the backend and to the database, requesting data from there.

## Overview

SideBase bootstraps a nuxt 3 project that permits developing a backend and a frontend using just nuxt 3. We want to show the world how enjoyable end-to-end typescript programming can be, displacing the myth that JS/TS-backends are no good. This starter solves a lot fo the "real-world" problems that occur after you start using Nuxt or any other framework: How to write backend tests? How to write component tests? How to calculate test coverage? How to integrate a database? How to build a docker image? ...?

If you have any problems with this project (e.g., setting it up on your PC) [open an issue](https://github.com/sidestream-tech/sidebase/issues/new/choose) and we'll figure it out together with you 🎉

Many things are possible (and useful for development) with this app. To:
- perform encapsulated component development via `histoire`,
- run `test`s,
- run `lint`ing,
- see how to get a debugger with breakpoints running

or execute further, other commands, please have a look at the more detailed [readme of the fullstack app](./app/README.md).
