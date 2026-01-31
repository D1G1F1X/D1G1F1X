import { Pool, QueryResult } from '@neondatabase/serverless'

let pool: Pool

export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    pool = new Pool({ connectionString })
  }
  return pool
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params?: (string | number | boolean | null | undefined)[]
): Promise<QueryResult<T>> {
  const client = getPool()
  return client.query(text, params)
}

export async function getClient(): Promise<ReturnType<Pool['connect']>> {
  const pool = getPool()
  return pool.connect()
}
