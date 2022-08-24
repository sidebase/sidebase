# The Scaffold: `fullstack-nuxt3`

This scaffold bootstraps a nuxt 3 project that permits developing a backend and a frontend using just nuxt 3. The application code is inside the `app/` folder. Read more [in it's README](./app/README.md). This scaffold provides out of the box:
- a functional nuxt 3 setup (see in `app/`),
- a drone pipeline for testing
- a functional backend with:
    - database connection
    - testing
- breakpoint debugging
- `Base` database model that can be usefully extended by project typeorm-classes

## Development

To start full-stack full app development (frontend, backend, database, ... running) run the following in your terminal:
```sh
# tab 1: start database (kill with Ctrl + C)
> docker compose up

# tab 2 (new tab): start the monolith
> cd app
> npm i
> npm run dev
```

Then visit [localhost:3000](http://localhost:3000) to see the webapp or [localhost:8081](http://localhost:8081) to see the database UI.

Many more things are possible (and useful for development). To:
- perform component development via `storybook`,
- run `test`s,
- run `lint`ing,
- see how to get a debugger with breakpoints running

or execute further, other commands, please have a look at the more detailed [readme of the fullstack app](./app/README.md).
