import { DataSource } from 'typeorm'
import { Example } from './entities/Example'
import { isProduction } from '~/helpers'

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  // TODO: Only synchronize in production once we're stable
  synchronize: !isProduction || true,
  logging: false,
  database: ':memory:',
  entities: [Example],
})

const initialize = async () => {
  console.log('DB: Initializing DB connection')

  if (AppDataSource.isInitialized) {
    console.log('DB: Already initialized')
    return
  }

  try {
    await AppDataSource.initialize()
  } catch (error) {
    console.trace('DB: Failed to initialized database', error)

    // Note: `process.exit` does not actually stop the development server, but will kill the production process run with `npm run start`
    if (isProduction) {
      process.exit(1)
    }
    throw error
  }

  console.log('DB: Successfully initialized database connection')
}

export { AppDataSource, initialize }
