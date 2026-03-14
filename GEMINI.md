# HexVerse Project Overview

HexVerse is a modern web application that integrates traditional Chinese divination techniques with contemporary Artificial Intelligence. It provides users with a platform to explore Xiaoliuren (小六壬), Liuyao (六爻), and Bazi (八字) fortune analysis through an interactive and AI-enhanced experience.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/docs) (utilizing `@ai-sdk/openai` and `ai` packages)
- **AI Model Provider:** Volcengine (火山引擎) - Doubao Models
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) / [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management & Hooks:** React Hooks (Custom hooks in `_hooks` directories)
- **Validation:** [Zod](https://zod.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## Project Architecture

The project follows the Next.js App Router structure with localized logic for different divination modules:

- **`src/app/`**: Root of the application routes.
  - **`api/openai/`**: Server-side route handling AI streaming responses using the Vercel AI SDK.
  - **`fortune/`**: Bazi (八字) fortune analysis module.
  - **`ren/`**: Xiaoliuren (小六壬) divination module.
  - **`yao/`**: Liuyao (六爻) divination module.
  - Each module (e.g., `ren`, `yao`) contains:
    - `_components/`: Module-specific UI components.
    - `_hooks/`: Custom hooks for state management and AI interaction.
    - `_lib/`: Domain-specific logic, constants, and data (e.g., hexagram definitions in `explains.json`).
- **`src/components/`**: Shared UI components, including Radix-based primitives in `ui/`.
- **`src/lib/`**: General utilities (`utils.ts`) and AI system prompts (`prompts.ts`).

## Core Functionalities

1.  **Xiaoliuren (小六壬):** Quick divination based on three numbers, resulting in one of the "Six Spirits" (大安, 留连, 速喜, 赤口, 小吉, 空亡).
2.  **Liuyao (六爻):** Traditional I Ching hexagram divination involving manual or automatic "coin tossing" to generate a hexagram with 64 possible outcomes.
3.  **Bazi Analysis (命理分析):** Detailed life path analysis based on birth date, time, and location, interpreted by an AI-powered "Metaphysics Analyst".
4.  **AI Interpretations:** All divination results are augmented with AI-generated explanations to provide modern insights and guidance.

## Building and Running

### Prerequisites
- Node.js (v20+ recommended)
- pnpm

### Commands
- **Install Dependencies:** `pnpm install`
- **Development Mode:** `pnpm dev`
- **Build for Production:** `pnpm build`
- **Start Production Server:** `pnpm start`
- **Linting:** `pnpm lint`

### Environment Variables
Create a `.env` file based on `env.example`:
- `V3_VOLCE_API_KEY`: Your Volcengine API key.
- `V3_VOLCE_API_URL`: The base URL for the Volcengine API.
- `V3_VOLCE_MODEL`: The specific model ID to use (e.g., Doubao-pro-32k).

## Development Conventions

- **TypeScript:** Use strict typing for all components and logic.
- **Component Pattern:** Prefer functional components and hooks. Localize components and logic within `_components`, `_hooks`, and `_lib` for specific routes unless they are genuinely shared across the app.
- **AI Logic:**
  - System prompts are stored in `src/lib/prompts.ts`.
  - AI streaming is handled via `src/app/api/openai/route.ts`.
- **Styling:** Use Tailwind CSS utility classes. The project uses a monochromatic/modern aesthetic with custom selection colors defined in `globals.css`.
- **Traditional Logic:** Divination calculations (like the modulo-6 arithmetic in Xiaoliuren) should remain in the respective `_lib` folders to keep business logic separate from UI.
