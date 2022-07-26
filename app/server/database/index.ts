import { DataSource } from 'typeorm'
import { Example } from './entities/Example'
import { isProduction } from '~/helpers'

const AppDataSource = new DataSource({
  type: 'postgres',
  // TODO: Only synchronize in production once we're stable
  synchronize: !isProduction || true,
  logging: false,
  host: process.env.NUXT_DATABASE_HOST || 'localhost',
  username: process.env.NUXT_DATABASE_USERNAME || 'postgres',
  password: process.env.NUXT_DATABASE_PASSWORD || 'postgres',
  port: Number(process.env.NUXT_DATABASE_PORT) || 5432,
  database: process.env.NUXT_DATABASE_DATABASE || 'postgres',
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
