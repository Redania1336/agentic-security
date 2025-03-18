
# Agentic Security Scanner

## Overview

The Agentic Security Scanner is an AI-powered security analysis tool that automatically detects vulnerabilities in code repositories. Built with React, TypeScript, and OpenAI's capabilities, it provides comprehensive security scanning with detailed reporting and actionable insights.

## Features

- **Static Code Analysis**: Scans code for hardcoded secrets and insecure patterns
- **Dependency Scanning**: Checks for known vulnerabilities in dependencies
- **Configuration Analysis**: Validates security settings in config files
- **Pattern Matching**: Uses vector similarity to find known vulnerability patterns
- **Web Search Enhancement**: Uses OpenAI's web search to find latest CVEs
- **Historical Analysis**: Tracks security posture over time
- **GitHub Issues Integration**: Creates issues for critical findings
- **Email Reporting**: Sends detailed security reports via email

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS for styling
- shadcn/ui component library
- OpenAI for intelligent analysis
- Edge Functions for serverless backend
- Local storage for result persistence

## Development Plans

The project follows a structured multi-phase development approach:

| Plan | Description |
|------|-------------|
| [Guidance](./src/plans/Guidance.md) | Coding standards, best practices, and project organization principles |
| [Phase 1](./src/plans/Phase1.md) | Core Security Scanner Setup - basic structure and functionality |
| [Phase 2](./src/plans/Phase2.md) | Advanced Features and Edge Function Integration |
| [Phase 3](./src/plans/Phase3.md) | GitHub Integration and Automation features |
| [Tests](./src/plans/Tests.md) | Complete testing strategy and specifications |
| [Implementation Progress](./src/plans/Implementation.md) | Current development status and completed features |
| [SEO Optimization](./src/plans/SEO.md) | Search engine optimization strategy |
| [Plans Overview](./src/plans/README.md) | Summary of all planning documents |

## Edge Function Details

The Security Scanner Edge Function provides the backend scanning capabilities:

### API Endpoints

1. `/init-scan`: Initialize a vector store for a repository
   ```
   POST /init-scan
   Body: { "repo": "owner/repo" }
   Returns: { "vectorStoreId": "vs_..." }
   ```

2. `/scan-repo`: Run a full security scan
   ```
   POST /scan-repo
   Body: { "repo": "owner/repo", "branch": "main" }
   Returns: ScanResult object
   ```

3. `/scan-results`: Get historical scan results
   ```
   POST /scan-results
   Body: { "repo": "owner/repo", "limit": 10 }
   Returns: { "results": ScanResult[] }
   ```

4. `/create-issues`: Create GitHub issues for findings
   ```
   POST /create-issues
   Body: { "repo": "owner/repo", "findings": SecurityFinding[] }
   Returns: { "created": number, "issues": string[] }
   ```

5. `/cron-trigger`: Endpoint for GitHub Actions to trigger nightly scans
   ```
   POST /cron-trigger
   Body: { "repo": "owner/repo", "branch": "main", "sendReport": true, "recipient": "user@example.com" }
   Returns: { "scanId": "scan_...", "message": "Scan queued successfully" }
   ```

6. `/send-report`: Send a security report via email
   ```
   POST /send-report
   Body: { "repo": "owner/repo", "recipient": "user@example.com", "includeRecommendations": true }
   Returns: { "success": true, "message": "Report sent successfully" }
   ```

### Environment Variables

- `OPENAI_API_KEY`: Required for OpenAI API access
- `GITHUB_TOKEN`: GitHub API token for repository access and issue creation
- `RESEND_API_KEY`: API key for the Resend email service

## Development Approach

This project was built using a multi-phase development approach with Roo Code Power Steering to optimize development costs and efficiency:

### Multi-Phase Development 

Instead of creating a single monolithic design document, the project is structured into phases:

- **Guidance.md**: Defines coding standards, naming conventions, and best practices
- **Phase1.md, Phase2.md, Phase3.md**: Breaks development into incremental, test-driven phases
- **Tests.md**: Specifies unit and integration tests to validate each phase
- **Implementation.md**: Tracks progress as features are completed

### Roo Code Power Steering

The project uses Gemini 2.0 Pro with Roo Code's Power Steering for efficient development:

- **Cost Optimization**: Reduces token costs by 98.75% for input tokens and 99% for output tokens compared to other AI assistants
- **Scalable Context**: Leverages Gemini Pro's 1M token context window (5x larger than alternatives)
- **Test-Driven Development**: Each function is completed and tested before moving to the next
- **Implementation Tracking**: Updates Implementation.md after each successful step
- **Environment Variable Protection**: Ensures environment variables are never hardcoded

## Local Development

1. Clone the repository:
```sh
git clone <repository-url>
cd agentic-security-scanner
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

4. Visit `http://localhost:8080` to see the application

## Testing

Run the test suite with:

```sh
npm test
```

For integration tests with the edge function:

```sh
npm run test:integration
```

## Deployment

The application can be deployed to any static hosting provider:

```sh
npm run build
```

Then deploy the contents of the `dist` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Supported by the [Agentics Foundation](https://agentics.org)
- Powered by OpenAI and Gemini 2.0 Pro
- Built with Roo Code Power Steering methodology
