# AI Agents Documentation

This directory contains configuration and instructions for AI agents used in the Mini HRIS Frontend project.

## Agent Files

### 🤖 [copilot-instructions.md](./copilot-instructions.md)
**Main AI Coding Agent Instructions**
- Comprehensive guidelines for the primary AI coding assistant
- Covers architecture, coding principles, project patterns, and behavior guidelines
- Includes investigation capabilities for major planning and feature analysis
- References all project conventions, tech stack, and development workflows

### 🔍 [agents/code_review.agent.md](./agents/code_review.agent.md)
**Specialized Code Review Agent**
- Focused on code quality reviews for Vue/Nuxt applications
- Structured review checklists covering architecture, performance, security, and best practices
- Specific tools optimized for frontend code analysis

## Usage Guidelines

- **Primary Development**: Use the main AI agent (copilot-instructions.md) for general coding tasks
- **Code Reviews**: Use the specialized code review agent for comprehensive code quality assessments
- **Major Planning**: The main agent includes investigation capabilities for feature analysis and planning

## Project Context

All agents are configured for the **Mini HRIS Frontend** project:
- **Framework**: Nuxt 4 / Vue 3 with TypeScript
- **UI**: NuxtUI (@nuxt/ui) with Tailwind CSS
- **Validation**: Zod schemas
- **Backend**: Laravel API integration
- **State**: Nuxt useState or Pinia

For detailed project information, see [copilot-instructions.md](./copilot-instructions.md).