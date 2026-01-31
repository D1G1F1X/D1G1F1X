import { Pool, QueryResult, PoolClient } from '@neondatabase/serverless'

let poolInstance: Pool | null = null

function initPool(): Pool {
  if (!poolInstance) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    poolInstance = new Pool({ connectionString })
  }
  return poolInstance
}

// Export pool as a lazy-initialized object
export const pool = {
  async query<T = Record<string, unknown>>(
    text: string,
    params?: (string | number | boolean | null | undefined)[]
  ): Promise<QueryResult<T>> {
    return initPool().query(text, params)
  },
  async connect(): Promise<PoolClient> {
    return initPool().connect()
  }
}

export function getPool(): Pool {
  return initPool()
}
