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

// Export pool as a getter to avoid module-level initialization
export const pool: Pool = new Proxy({} as Pool, {
  get(target, prop) {
    const instance = initPool()
    const value = instance[prop as keyof Pool]
    return typeof value === 'function' ? value.bind(instance) : value
  }
})

export function getPool(): Pool {
  return initPool()
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
