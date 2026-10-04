# 🏆 DriftGuard: Judging & Evaluation Walkthrough

Welcome Judges! This guide explains how **DriftGuard** directly satisfies all four hackathon evaluation criteria for **Path 1: Ship an agent that queries real content**.

---

## 1. Meaningful Use of Sanity Context and Structured Content
* **Structured Schemas:** Rather than treating Sanity as a flat vector dump, DriftGuard leverages structured content records:
  - `feature`: The API or pattern under scrutiny.
  - `deprecatedIn` & `removedIn`: Exact version metadata.
  - `severity`: Structured crash risk classification (`CRITICAL`, `HIGH`, `MEDIUM`).
  - `contradiction`: Captures conflicting claims, official sources, and editorial rulings.
* **Preserving Human Decisions:** When internet tutorials contradict official breaking change releases, Sanity's dashboard surfaces both claims side-by-side. The human editorial override (`resolvedBy`, `resolution`, `resolvedAt`) is stored directly in the Knowledge Base and dictates how the agent refactors code.

---

## 2. Technical Implementation and Code Quality
* **Model Context Protocol (MCP) Standard:** Implements the official MCP JSON-RPC protocol specification over HTTP/SSE.
* **Type-Safe Fullstack:** End-to-end TypeScript architecture across both the server agent engine (`/server`) and the interactive developer studio (`/client`).
* **Dual-Mode Engine:**
  - **Live Mode:** Connects to real Sanity Context endpoints using `SANITY_CONTEXT_URL` and API tokens.
  - **Simulation Mode:** Bundles offline high-fidelity MCP responders so judges can evaluate the app instantly without API setup delays.

---

## 3. Use of Knowledge Bases
* **Curated Real-World Ecosystems:**
  1. **Vercel AI SDK (3.x to 4.x):** Streaming responses, unified model adapters (`streamText`), and tool calling syntax.
  2. **Next.js (14 to 15):** Async request APIs (`params`, `cookies()`) and App Router data-fetching boundaries.
  3. **Pydantic (v1 to v2):** `ConfigDict`, `@field_validator`, and `.model_dump()` migrations.
* **Source Grounding:** Every single line warning in the audit results contains clickable source links directly to the official migration guides and GitHub changelogs.

---

## 4. Usability
* **1-Click Test Presets:** Judges can test real breaking change scenarios instantly with pre-loaded presets without writing code.
* **Visual Clarity:** Clear severity tags, code snippets with line numbers, and a side-by-side refactoring diff viewer.
* **Live Connection Monitor:** Real-time health badge displaying latency, indexed document counts, and contradiction tracking.

---

## Quick Start for Evaluators

1. **Start the backend:**
   ```bash
   cd server
   npm install
   npm run dev
   ```
2. **Start the frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.
4. Pick any preset (e.g. **Vercel AI SDK 3.x -> 4.x**), click **Audit with Sanity Context**, inspect the **Contradiction Card**, and click **Refactor with Sanity Grounding**.
