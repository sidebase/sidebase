import { execSync } from 'child_process'

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

  if (process.env.NODE_ENV === 'production') {
    throw new Error('This utility should not be called in production. It is meant for testing and development')
  }

  execSync(`cd ${process.cwd()} && DATABASE_URL=${url} npx prisma db push --force-reset`, { stdio: 'inherit' })
}
