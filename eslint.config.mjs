import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // .claude/** holds Claude Code worktrees (other branches, with their own node_modules).
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.claude/**']),
])
