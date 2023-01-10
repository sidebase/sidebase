import { execSync } from 'child_process'
import { resolve } from 'path'

/**
 * Helper to reset the database via a programmatic prisma invocation. Helpful to add to \`beforeEach\` or \`beforeAll\` of your testing setup.
 *
 * WARNING: Never run this in production.
 *
 * Taken from https://github.com/prisma/prisma/issues/13549#issuecomment-1144883246
 *
 * @param databaseUrl Connection URL to database. Inferred from \`process.env.DATABASE_URL\` if not provided
 */
export const resetDatabase = (databaseUrl?: string) => {
  const url = databaseUrl || process.env.DATABASE_URL
  if (!url) {
    throw new Error('Cannot reset database - connection string could not be inferred.')
  }

  execSync(`cd ${process.cwd()} && DATABASE_URL=${url} npx prisma db push --force-reset`, { stdio: 'inherit' })
}

/**
 * Takes a path to a file, makes it absolute and then sets the `DATABASE_URL` environment variable to a value of the form `file:/path/to/db.sqlite`.
 *
 * This method can be helpful for development and testing to ensure that all code uses the same, absolute `db.sqlite` file.
 *
 * @param pathToSqliteFile string The location of the `db.sqlite` file. E.g.: `./db.sqlite` or `db.sqlite` or `/Users/test/nuxtprisma/db.sqlite`
 * @param environmentVariableName string Name of the environment variable to export the `file:/...` database url to, this is the name that prisma uses in the `schema.prisma` `env(...)` directive
 */
export function setAbsoluteSqliteDatabaseUrlForPrisma (pathToSqliteFile: string = resolve('./db.sqlite'), environmentVariableName = 'DATABASE_URL') {
  if (process.env.DATABASE_URL) {
    // User or nuxt set their own `DATABASE_URL`, do not overwrite it
    return
  }

  // We need to resolve again in case a relative path was passed
  const absoluteDbPath = `file:${resolve(pathToSqliteFile)}`
  process.env[environmentVariableName] = absoluteDbPath
}
