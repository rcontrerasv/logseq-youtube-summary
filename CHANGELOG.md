# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
