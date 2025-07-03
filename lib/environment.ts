/**
 * Back-compat barrel re-export
 *
 * Older modules import "@/lib/environment".
 * New code lives in "@/lib/config/environment".
 * Re-export all public helpers so legacy imports keep working.
 */

export * from "./config/environment"
