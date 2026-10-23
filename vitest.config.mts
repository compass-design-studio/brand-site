import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('.', import.meta.url)) } },
  // .claude/** holds Claude Code worktrees (other branches, with their own node_modules).
  test: { include: ['**/*.test.ts'], exclude: ['node_modules/**', '.next/**', '.claude/**'] },
})
