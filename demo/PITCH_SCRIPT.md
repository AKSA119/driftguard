# 🎬 DriftGuard: 2-Minute Hackathon Video Pitch Script

**Track:** Path 1 — Ship an agent that queries real content  
**Target Duration:** 120 seconds (2:00)  
**Presenter:** [Your Name / Team Name]

---

### [0:00 - 0:25] The Hook & The Critical Pain Point
*(Visual: Screen recording of ChatGPT or Copilot outputting deprecated code, then showing a nasty runtime crash `TypeError: StreamingTextResponse is not a constructor` or `Next.js 15 sync params error`)*

> "Every single developer here has asked an AI coding assistant for help, copy-pasted the code, and immediately watched it crash. Why? Because LLMs are trained on years of outdated tutorials and community forum posts.
> 
> When libraries like Next.js, Vercel AI SDK, or Pydantic release major versions, the internet is flooded with conflicting information. In production software, we need answers our agents **cannot afford to get wrong**."

---

### [0:25 - 0:55] Introducing DriftGuard & The Sanity Context Superpower
*(Visual: Switch to DriftGuard UI showing the dark-mode developer studio, then click on the 'Sanity KB & Conflicts' button)*

> "Meet **DriftGuard**: an intelligent code sanitizer and refactor agent powered by **Sanity Context** over the **Model Context Protocol (MCP)**.
> 
> Instead of relying on fuzzy model memory, DriftGuard queries an authoritative Knowledge Base in Sanity. But here’s the game-changer: **Contradiction Resolution**.
> 
> In our Sanity Dashboard, we ingested both popular community tutorials from 2023 and official v4 release notes. When Sanity detected that the tutorial claims contradict the official changelog, it surfaced both side-by-side. Our team made the editorial decision to enforce the official RFC—and Sanity preserved that human decision permanently across all future agent builds."

---

### [0:55 - 1:35] Live Demo: Audit & Instant Refactor
*(Visual: Select the 'Vercel AI SDK 3.x -> 4.x' preset, click 'Audit with Sanity Context', show the diagnostics, click into citations, then click 'Refactor with Sanity Grounding')*

> "Watch DriftGuard in action. We'll paste this standard AI-generated route handler using `OpenAIStream` and `StreamingTextResponse`. 
> 
> In one click, DriftGuard's agent queries our Sanity Context MCP endpoint. Look at the diagnostics:
> - It flags the exact lines causing runtime crashes.
> - Every warning links directly to the official changelog section.
> - Most importantly, it displays the Sanity Contradiction Card showing the outdated blog claim versus the official release.
> 
> Now, we hit **'Refactor with Sanity Grounding'**. In milliseconds, DriftGuard swaps the deprecated wrappers for the canonical `streamText()` API and `toDataStreamResponse()`, generating a clean side-by-side diff ready to copy or push into a PR."

---

### [1:35 - 2:00] Evaluation Criteria Recap & Wrap-Up
*(Visual: Show the 3 ecosystems Next.js 15, Vercel AI SDK, Pydantic v2, and show the MCP protocol health monitor)*

> "DriftGuard fulfills every core pillar of Path 1:
> 1. **Meaningful Sanity Context:** The agent’s decision pipeline is 100% grounded in Sanity's structured content and contradiction resolution.
> 2. **Technical Quality:** Built with full-stack TypeScript, standard MCP JSON-RPC protocols, and robust AST analysis.
> 3. **Usability:** 1-click test presets, side-by-side diffing, and zero-config evaluation.
> 
> Ground your agents in real content. Stop debugging phantom documentation with DriftGuard. Thank you!"
