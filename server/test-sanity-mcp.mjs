import 'dotenv/config'
import { createMCPClient } from '@ai-sdk/mcp'

const url = process.env.SANITY_CONTEXT_MCP_URL
const token = process.env.SANITY_ORGANIZATION_TOKEN

if (!url || !token) {
  throw new Error('Missing SANITY_CONTEXT_MCP_URL or SANITY_ORGANIZATION_TOKEN')
}

const mcpClient = await createMCPClient({
  transport: {
    type: 'http',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
})

const tools = await mcpClient.tools()

console.log('Sanity Context connected!')
console.log('Available tools:')
console.log(Object.keys(tools))

await mcpClient.close()