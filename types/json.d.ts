/**
 * Makes `import something from "./file.json"` legal in TypeScript files.
 * The JSON type is left as `any` so callers can cast or narrow as needed.
 */
declare module "*.json" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any
  export default value
}
