import { Pool, QueryResult, PoolClient } from '@neondatabase/serverless'

let poolInstance: Pool

export const pool = {
  query: async <T = Record<string, unknown>>(
    text: string,
    params?: (string | number | boolean | null | undefined)[]
  ): Promise<QueryResult<T>> => {
    const client = getPool()
    return client.query(text, params)
  }
}

export function getPool(): Pool {
  if (!poolInstance) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    poolInstance = new Pool({ connectionString })
  }
  return poolInstance
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: (string | number | boolean | null | undefined)[]
): Promise<QueryResult<T>> {
  const client = getPool()
  return client.query(text, params)
}

export async function getClient(): Promise<PoolClient> {
  const poolInst = getPool()
  return poolInst.connect()
}
