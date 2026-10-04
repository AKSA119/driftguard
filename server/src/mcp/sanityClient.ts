import { createMCPClient } from '@ai-sdk/mcp'

let mcpClient: Awaited<ReturnType<typeof createMCPClient>> | null = null
let cachedItems: any[] = []

async function getClient() {
  if (mcpClient) return mcpClient

  const url = process.env.SANITY_CONTEXT_MCP_URL
  const token = process.env.SANITY_ORGANIZATION_TOKEN

  if (!url || !token) {
    throw new Error(
      'Missing SANITY_CONTEXT_MCP_URL or SANITY_ORGANIZATION_TOKEN'
    )
  }

  mcpClient = await createMCPClient({
    transport: {
      type: 'http',
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  return mcpClient
}

async function runGroqQuery(query: string) {
  const client = await getClient()
  const tools = await client.tools()

  if (!tools.groq_query) {
    throw new Error('Sanity Context groq_query tool is not available')
  }

  const result = await tools.groq_query.execute(
  { query },
  {
    toolCallId: 'driftguard-groq-query',
    messages: [],
  }
)

  return result
}

export const sanityClient = {
  async queryKnowledgeBase(
    _query: string,
    ecosystem?: string
  ) {
    const result: any = await runGroqQuery(
      `*[_type == "codeRule"]`
    )

    const items = result?.result ?? result ?? []

    cachedItems = Array.isArray(items) ? items : []

    if (!ecosystem) {
      return cachedItems
    }

    const wanted = ecosystem.toLowerCase()

    return cachedItems.filter((item: any) => {
      const technology = String(item.technology ?? '').toLowerCase()
      return (
        technology.includes(wanted) ||
        wanted.includes(technology) ||
        wanted.includes('next') && technology.includes('next') ||
        wanted.includes('vercel') && technology.includes('vercel')
      )
    })
  },

  async fetch<T = unknown>(
    query: string,
    _params: Record<string, unknown> = {}
  ): Promise<T> {
    const result: any = await runGroqQuery(query)
    return (result?.result ?? result) as T
  },

  async getStatus() {
    try {
      await getClient()

      return {
        connected: true,
        mode: 'groq',
        endpoint: process.env.SANITY_CONTEXT_MCP_URL,
        dataset: 'production',
      }
    } catch (error) {
      return {
        connected: false,
        mode: 'groq',
        error: error instanceof Error ? error.message : String(error),
      }
    }
  },

  getAllKnowledgeBaseItems() {
    return cachedItems
  },

  getContradictions() {
    return cachedItems.filter(
      (item: any) =>
        item.contradiction ||
        item.conflictingClaim ||
        item.officialClaim
    )
  },

  updateConfig(config: {
    endpoint?: string
    projectId?: string
    dataset?: string
    token?: string
  }) {
    console.log('Sanity Context configuration received:', {
      endpoint: config.endpoint ? '[provided]' : '[env]',
      projectId: config.projectId ? '[provided]' : '[env]',
      dataset: config.dataset ?? 'production',
      token: config.token ? '[provided]' : '[env]',
    })
  },
}

export async function getSanityClient() {
  return getClient()
}

export async function getSanityTools() {
  const client = await getClient()
  return await client.tools()
}