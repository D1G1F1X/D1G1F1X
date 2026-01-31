import { Pool, QueryResult, PoolClient } from '@neondatabase/serverless'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export const pool = new Pool({ connectionString })

export function getPool(): Pool {
  return pool
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
