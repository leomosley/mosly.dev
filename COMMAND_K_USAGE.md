# Command K Feature

A comprehensive command palette for navigating the site, opening links, and chatting with an AI assistant.

## Usage

Press `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) to open the command menu.

## Features

### 1. **Page Navigation**
- Home
- Blog
- Individual blog posts

### 2. **External Links**
- GitHub
- LinkedIn
- Twitter/X
- Sitemap
- RSS Feed

### 3. **AI Chat**
- Select "Start AI Chat" from the command menu
- The AI assistant has full context about Leo from CONTEXT.md
- Chat in real-time with streaming responses
- Ask questions about Leo's work, projects, and experience

## AI Chat Features

The AI chat mode:
- Automatically loads context about Leo from `/CONTEXT.md`
- Uses Llama-3.1-8B-Instruct model running locally in the browser via WebLLM
- Streams responses in real-time
- Maintains conversation history within the session
- Provides a "Back" button to return to the main command menu

## Technical Details

- **Model**: Llama-3.1-8B-Instruct-q4f32_1-MLC
- **Context**: Automatically includes site information from CONTEXT.md
- **Client**: WebLLM (@mlc-ai/web-llm) running entirely in the browser
- **Framework**: Next.js 16 with React Server Components
- **UI**: Built with Radix UI Dialog and cmdk

## Example Questions for AI

- "What projects has Leo worked on?"
- "Tell me about Leo's work experience"
- "What technologies does Leo use?"
- "What is Leo studying?"

## Icons Used

- **Home**: Home icon (lucide-react)
- **Blog posts**: FileText icon (lucide-react)
- **GitHub**: FaGithub (react-icons/fa6)
- **LinkedIn**: FaLinkedin (react-icons/fa6)
- **Twitter**: FaXTwitter (react-icons/fa6)
- **Sitemap**: FaSitemap (react-icons/fa6)
- **RSS**: FaRss (react-icons/fa6)
- **AI Chat**: Sparkles icon (lucide-react)
- **Send message**: Send icon (lucide-react)
- **Loading**: Loader2 icon (lucide-react)
