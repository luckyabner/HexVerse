# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HexVerse is a web application that combines traditional Chinese divination wisdom (周易) with modern AI analysis. It provides three main features:
- **六爻起卦** (Hexagram Divination): Classic I Ching divination with cybernetic coin tossing
- **小六壬** (Xiaoliu Ren): Quick divination for daily decisions
- **命理分析** (Fortune Analysis): AI-powered Bazi (八字) birth chart analysis

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Runtime**: React 19
- **Styling**: Tailwind CSS 4.0, Radix UI components (shadcn pattern)
- **AI**: Vercel AI SDK with multi-provider support (Zhipu GLM, OpenAI, Claude)
- **Package Manager**: pnpm

## Common Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack

# Build & Production
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # ESLint check
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/openai/         # AI streaming API endpoint
│   ├── fortune/            # 命理分析 page
│   ├── ren/                # 小六壬 page
│   ├── yao/                # 六爻起卦 page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # Radix UI shadcn components
│   ├── AIConfigModal.tsx   # AI provider configuration modal
│   └── NavBar.tsx         # Navigation
├── hooks/
│   └── useAIConfig.ts      # AI config state (localStorage)
└── lib/
    ├── prompts.ts          # AI system prompts
    └── utils.ts            # cn() className merger
```

## AI Configuration

The app supports multiple AI providers configurable via UI:
- **Default**: Zhipu AI (GLM) - configured via environment variables
- **OpenAI**: Custom API key and endpoint
- **Claude**: Anthropic API
- **Custom**: Any OpenAI-compatible API

Configuration is stored in `localStorage` under key `hexverse_ai_config`.

## Environment Variables

Create a `.env` file based on `env.example`:

```
ZHIPU_API_KEY=your_key
ZHIPU_API_URL=https://open.bigmodel.cn/api/paas/v4
ZHIPU_MODEL=glm-4-flash
```

## Key Implementation Details

- AI streaming uses Vercel AI SDK's `streamText` with `toDataStreamResponse()`
- Custom AI config is read from localStorage in API route via `aiConfig` payload
- Each divination feature (ren, yao) has its own subdirectory with components, hooks, and lib
- UI components follow Radix UI + shadcn pattern with Tailwind CSS

## Design Context

### Users
Chinese-speaking users interested in traditional divination (I Ching, Bazi, 小六壬). They seek guidance for daily decisions and life path analysis. Users value clarity, authenticity, and thoughtful design that respects traditional wisdom.

### Brand Personality
**Clean & Minimal** - The interface should feel uncluttered, purposeful, and serene. Subtle interactions over dramatic animations. Focus on content (divination results) over decoration. Trust through clarity.

### Aesthetic Direction
- **Style**: Minimalist SaaS aesthetic - clean typography, generous whitespace, restrained color
- **Theme**: Light/dark mode supported; primary is purple/indigo (OKLCH 0.208) - mystical but not generic AI
- **Font**: Monospace (already in use) for a technical, precise feel
- **Avoid**: Generic AI look - no solid blue/purple gradients, no robotic/corporate aesthetics

### Design Principles
1. **Content First**: Divination results and insights are the hero. Minimize chrome and visual noise.
2. **Purposeful Motion**: Animations should feel natural and unobtrusive (using tw-animate-css). Avoid over-animating.
3. **Respect Tradition**: While minimal, the design should honor the cultural heritage - refined, not playful.
4. **Trust Through Clarity**: Clear CTAs, understandable flows, no confusing jargon. Users should feel confident in their interactions.
5. **Subtle Mystery**: The mystical element should come through subtle cues (icons, typography, spacing) rather than flashy effects.
