<div align="center">
  <img src="icon.png" alt="YouTube Summary Logo" width="200"/>

  # YouTube Summary
  ### Plugin for Logseq

  Intelligent AI-powered summaries of YouTube videos

  [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/rodandresv)
</div>

---

## 📝 Description

Logseq plugin that summarizes YouTube videos using your own LLM API key (OpenAI or Anthropic). Automatically extracts video transcripts, detects language, and generates a structured summary that's inserted as child blocks in your Logseq page.

## ✨ Features

- 🌍 **Multilingual Interface**: Auto-detects language from Logseq settings or manual configuration (English/Spanish)
- 🎬 **Interactive Dialog**: Automatically prompts for URL when you run the command
- ⚡ **Quick Slash Command**: Just type `/youtube-summary` and you're ready
- 📝 **Automatic Extraction**: Effortlessly retrieves YouTube transcripts
- 🤖 **Multi-LLM Support**: Works with OpenAI (GPT-4o, GPT-4o-mini, GPT-4-turbo) and Anthropic (Claude Sonnet 4, Claude Opus 4)
- 📊 **Structured Summaries**: Organized with main topic, key points, and conclusion
- 🎯 **Smart Hierarchy**: Creates proper parent-child block relationships in Logseq
- 🔄 **Automatic Model Switching**: Model updates automatically when you change provider
- ⚙️ **Easy Configuration**: Built-in settings interface in Logseq
- 🎥 **Auto-generated Subtitles**: Works with YouTube's auto-generated captions

## Installation

### Development Mode

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the plugin:**
   ```bash
   npm run build
   ```

   Or for development mode with watch (auto-reload):
   ```bash
   npm run dev
   ```

   This generates the necessary files in the `dist/` folder:
   - `dist/index.html` - HTML file that loads the plugin
   - `dist/index.js` - Plugin JavaScript code

4. **Load the plugin in Logseq:**
   - Open Logseq
   - Go to `Settings` → `Advanced` → Enable `Developer mode` (ON)
   - Go to `...` (menu) → `Plugins` → `Load unpacked plugin`
   - Select the project folder (`youtube-summary`)

## Configuration

### Getting API Keys

Before using the plugin, you need to configure an API key:

#### OpenAI
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (only shown once)

#### Anthropic
1. Go to [https://console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Sign in or create an account
3. Click "Create Key"
4. Copy the key

### Plugin Settings

1. In Logseq, go to `Settings` → `Plugins` → `YouTube Summary`
2. **Language**: Choose interface language or "Auto" to detect from Logseq settings
3. **LLM Provider**: Select your provider (OpenAI or Anthropic)
   - 💡 The model will automatically update when you change provider
4. **API Key**: Paste your API key in the corresponding field
5. **Model** (Optional): Change the model if you want to use a different one:
   - **OpenAI**: `gpt-4o-mini` (fast), `gpt-4o` (recommended), `gpt-4-turbo`
   - **Anthropic**: `claude-sonnet-4-20250514` (recommended), `claude-opus-4-20250514`

## 🚀 Usage

### Option 1: With Dialog (Recommended)

1. **Create a new block** in Logseq
2. **Type `/youtube-summary`** and press Enter
3. **Paste the URL** in the dialog that appears:
   ```
   https://www.youtube.com/watch?v=xxxxx
   ```
4. **Wait for the summary** - The plugin will automatically:
   - Update the block with the URL
   - Extract the transcript
   - Generate the AI summary
   - Insert child blocks with the summary

### Option 2: Existing URL

1. **First paste a YouTube URL** in a block
2. **Type `/youtube-summary`** in the same block
3. **The summary generates** automatically

### Output Format

The summary is inserted with the following structure:

```
- https://youtube.com/watch?v=xxxxx (parent block)
  - **Video**: Video Title - Channel Name
  - **Main topic**: [concise description]
  - **Key points**:
    - Point 1
    - Point 2
    - Point 3
  - **Conclusion**: [main takeaway]
```

## Supported URL Formats

The plugin supports the following YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `youtube.com/watch?v=VIDEO_ID` (without https)
- `youtu.be/VIDEO_ID` (without https)

## Limitations

- ⚠️ **Videos with transcripts only**: The plugin only works with videos that have subtitles available (including auto-generated). If a video has no transcript, you'll see an error message.
- ⚠️ **Requires API key**: You need a valid OpenAI or Anthropic API key to use the plugin.
- ⚠️ **API costs**: Using LLM APIs may incur costs depending on your plan. Check pricing on OpenAI and Anthropic official pages.
- ⚠️ **Rate limits**: APIs have usage limits. If you exceed the limit, you'll need to wait before trying again.

## Error Handling

The plugin displays clear messages for different error types:

- **Invalid URL**: Verify the URL is from YouTube and in a valid format
- **No transcript**: The video doesn't have subtitles available
- **API key not configured**: Go to Settings to configure your API key
- **Invalid API key**: Verify you copied your API key correctly
- **Rate limit exceeded**: Wait a few minutes before trying again
- **Model not found**: Verify the model name is correct

## Development

### Project Structure

```
youtube-summary/
├── package.json
├── tsconfig.json
├── README.md
├── README.es.md
├── CHANGELOG.md
├── .gitignore
└── src/
    ├── index.ts          # Entry point, registers command
    ├── settings.ts       # Settings UI and config management
    ├── youtube.ts        # Extraction of title, channel, and transcript
    ├── llm.ts           # OpenAI and Anthropic API calls
    ├── language.ts      # Language detection
    ├── formatter.ts     # Format summary to Logseq structure
    ├── i18n.ts          # Internationalization (English/Spanish)
    └── types.ts         # TypeScript types/interfaces
```

### Available Scripts

- `npm run dev`: Build in development mode with watch (auto-reload)
- `npm run build`: Build for production (minified)

### Technologies Used

- **TypeScript**: Programming language
- **@logseq/libs**: Official Logseq API for plugins
- **@danielxceron/youtube-transcript**: Improved fork with fallback system to extract YouTube transcripts (including auto-generated subtitles)
- **franc-min**: Language detection
- **openai**: Official OpenAI SDK
- **@anthropic-ai/sdk**: Official Anthropic SDK
- **esbuild**: Fast bundler for compilation

> **Note**: We use the `@danielxceron/youtube-transcript` fork instead of the original library because it has a fallback system that works with the latest YouTube updates (2025) and supports auto-generated subtitles more reliably.

## Contributing

Contributions are welcome. If you find a bug or have a suggestion, please open an issue in the repository.

## Support

If you find this plugin useful, consider supporting its development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/rodandresv)

## License

MIT

## Acknowledgments

- Logseq for the excellent platform and plugin API
- The developers of the libraries used

---

**[🇪🇸 Versión en Español](README.es.md)**
