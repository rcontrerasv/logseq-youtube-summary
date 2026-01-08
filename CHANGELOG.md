# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.5] - 2025-01-08

### Added
- **Multi-Provider Support**: Now supports 7 LLM providers with 18 models
  - OpenAI: gpt-4o-mini, gpt-4o, o1-mini
  - Anthropic: claude-sonnet-4-20250514, claude-opus-4-20250514
  - DeepSeek: deepseek-chat, deepseek-reasoner
  - Google Gemini: gemini-2.5-flash, gemini-2.5-pro
  - xAI Grok: grok-3, grok-4
  - Alibaba Qwen: qwen-turbo, qwen-plus, qwen-max
  - Moonshot: moonshot-v1-8k, moonshot-v1-32k
- Auto-detection of provider and API endpoint from model selection

### Changed
- Simplified settings: removed Provider selector (now auto-detected)
- Reordered settings: Language → Model → API Key
- Simplified API key description
- Optimized icon.png size (3.7MB → 59KB)

### Removed
- Provider dropdown (replaced by auto-detection)
- Custom model field (18 pre-configured models is sufficient)

## [0.1.4] - 2025-01-05

### Added
- Supadata API fallback for paid transcripts
- Donation message when external service is used

## [0.1.3] - 2025-01-05

### Fixed
- CORS error when fetching YouTube transcripts

## [0.1.2] - 2025-01-05

### Changed
- Minor improvements and bug fixes

## [0.1.1] - 2025-01-30

### Fixed
- Fixed "Not existed method #ui_showInputDialog" error when running command without URL
- Simplified UX: Now shows helpful message asking user to paste URL first
- Removed dependency on non-existent Logseq dialog API

### Changed
- Updated workflow: Users paste URL in block first, then run `/youtube-summary`
- Added `pasteUrlFirst` message in both English and Spanish

## [0.1.0] - 2025-01-30

### Added
- Initial release of YouTube Summary plugin for Logseq
- Multi-LLM support (OpenAI and Anthropic)
  - OpenAI: GPT-4o, GPT-4o-mini, GPT-4-turbo
  - Anthropic: Claude Sonnet 4, Claude Opus 4
- Automatic YouTube transcript extraction
  - Support for auto-generated subtitles
  - Uses `@danielxceron/youtube-transcript` fork with fallback system
- Internationalization (i18n) support
  - English and Spanish interface
  - Auto-detection from Logseq settings
  - Manual language override in settings
  - LLM summaries respect interface language
- Interactive dialog to input YouTube URL
- Slash command `/youtube-summary` for quick access
- Structured summary format
  - Main topic
  - Key points with hierarchical organization
  - Conclusion
- Smart block hierarchy with proper parent-child relationships
- Automatic model switching when changing LLM provider
- Language detection for transcripts (30+ languages)
- Video metadata extraction (title, channel)
- Comprehensive error handling
  - Invalid URL detection
  - No transcript available
  - API key validation
  - Rate limit handling
  - Model not found errors
- Settings UI integration
  - Language selection
  - LLM provider selection
  - API key configuration (password input)
  - Model selection
- User feedback with single loading message
- Console logging for debugging

### Technical
- TypeScript implementation with strict mode
- esbuild for fast compilation
- Modular architecture with separation of concerns
  - `index.ts`: Entry point and command registration
  - `settings.ts`: Settings management
  - `youtube.ts`: YouTube API integration
  - `llm.ts`: LLM provider abstraction
  - `language.ts`: Language detection
  - `formatter.ts`: Summary formatting and parsing
  - `i18n.ts`: Internationalization system
  - `types.ts`: TypeScript interfaces
- Comprehensive documentation (README in English and Spanish)

### Dependencies
- `@logseq/libs`: ^0.0.15
- `@danielxceron/youtube-transcript`: ^1.2.3
- `openai`: ^4.77.3
- `@anthropic-ai/sdk`: ^0.32.1
- `franc-min`: ^6.2.0
- `typescript`: ^5.7.3
- `esbuild`: ^0.24.2

[0.1.0]: https://github.com/username/youtube-summary/releases/tag/v0.1.0
