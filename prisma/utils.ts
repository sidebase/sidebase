import { execSync } from 'child_process'

// Initialize database via programmatic prisma invocation, see https://github.com/prisma/prisma/issues/13549#issuecomment-1144883246
export const resetDatabase = () => execSync(`cd ${process.cwd()} && DATABASE_URL=${process.env.DATABASE_URL} prisma db push --force-reset`, { stdio: 'inherit' })
