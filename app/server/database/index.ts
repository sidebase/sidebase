import { DataSource } from 'typeorm'
import { Example } from './entities/Example'
import { isProduction } from '~/helpers'

const AppDataSource = new DataSource({
  type: 'sqlite',
  // TODO: Only synchronize in production once we're stable
  synchronize: !isProduction || true,
  logging: false,
  database: ':memory:',
  entities: [Example],
})

const initialize = async () => {
  if (AppDataSource.isInitialized) {
    console.log('DB: Already initialized')
    return
  }

  try {
    await AppDataSource.initialize()
  } catch (error) {
    console.error('DB: Failed to initialized database')
    throw error
  }
}

export { AppDataSource, initialize }
