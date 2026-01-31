import { Pool, QueryResult, PoolClient } from '@neondatabase/serverless'

let poolInstance: Pool | null = null

function initPool(): Pool {
  if (!poolInstance) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    try {
      poolInstance = new Pool({ connectionString })
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error)
      throw new Error(`Failed to initialize database pool: ${err}`)
    }
  }
  return poolInstance
}

// Export pool as a lazy-initialized object
export const pool = {
  async query<T = Record<string, unknown>>(
    text: string,
    params?: (string | number | boolean | null | undefined)[]
  ): Promise<QueryResult<T>> {
    try {
      return await initPool().query<T>(text, params)
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error)
      throw new Error(`Database query failed: ${err}`)
    }
  },
  async connect(): Promise<PoolClient> {
    try {
      return await initPool().connect()
    } catch (error) {
      const err = error instanceof Error ? error.message : String(error)
      throw new Error(`Failed to connect to database: ${err}`)
    }
  },
}

export function getPool(): Pool {
  return initPool()
}
