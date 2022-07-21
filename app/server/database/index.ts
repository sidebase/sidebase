import { DataSource } from 'typeorm'
import { isProduction } from '~/helpers'

const AppDataSource = new DataSource({
  type: 'postgres',
  synchronize: !isProduction || true, // TODO: Only synchronize in production once we're stable
  logging: false,
  host: process.env.NUXT_DATABASE_HOST || 'localhost',
  username: process.env.NUXT_DATABASE_USERNAME || 'postgres',
  password: process.env.NUXT_DATABASE_PASSWORD || 'postgres',
  port: Number(process.env.NUXT_DATABASE_PORT) || 5432,
  database: process.env.NUXT_DATABASE_DATABASE || 'postgres',
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
