import { resolve } from 'path'

/**
 * Setup the database environment.
 *
 * This is necessary for the vanilla `sqlite` setup, as it depends on a file that is in an absolute place.
 *
 * As soon as the user adds a `.env` file overwriting `DATABASE_URL` or export `DATABSE_URL` themselves we do not want to set the database url manually any longer.
 *
 */
export const setup = () => {
  if (process.env.DATABASE_URL) {
    // User or nuxt set their own `DATABASE_URL`, do not overwrite it
    return
  }

  const rootDir = resolve('./db.sqlite')
  const absoluteDbPath = `file:${rootDir}`
  process.env.DATABASE_URL = absoluteDbPath
}
