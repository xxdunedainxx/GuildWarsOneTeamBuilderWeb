import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, server }) => {
  // Conditionally modify base depending on if its local dev vs in the github site
  const isLocal = command === 'serve'
  return {
    plugins: [react()],
    // use '/' if its local dev, otherwise use the github site base 
    base: isLocal ? '/' : '/GuildWarsOneTeamBuilderWeb/site/',
  }
})