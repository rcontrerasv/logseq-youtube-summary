<div align="center">
  <img src="icon.png" alt="YouTube Summary Logo" width="200"/>

  # YouTube Summary
  ### Plugin for Logseq

  Intelligent AI-powered summaries of YouTube videos

  [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/rodandresv)
</div>

---

## 📝 Description

Logseq plugin that summarizes YouTube videos using your own LLM API key. Supports 7 providers: OpenAI, Anthropic, DeepSeek, Google Gemini, xAI Grok, Alibaba Qwen, and Moonshot. Automatically extracts video transcripts, detects language, and generates a structured summary that's inserted as child blocks in your Logseq page.

## ✨ Features

- 🌍 **Multilingual Interface**: Auto-detects language from Logseq settings or manual configuration (English/Spanish)
- 🎬 **Interactive Dialog**: Automatically prompts for URL when you run the command
- ⚡ **Quick Slash Command**: Just type `/youtube-summary` and you're ready
- 📝 **Automatic Extraction**: Effortlessly retrieves YouTube transcripts
- 🤖 **Multi-LLM Support**: 7 providers with 18 models - OpenAI, Anthropic, DeepSeek, Gemini, Grok, Qwen, Moonshot
- 📊 **Structured Summaries**: Organized with main topic, key points, and conclusion
- 🎯 **Smart Hierarchy**: Creates proper parent-child block relationships in Logseq
- 🔄 **Auto-Detection**: Provider and API endpoint detected automatically from model selection
- ⚙️ **Easy Configuration**: Just select a model and enter your API key
- 🎥 **Auto-generated Subtitles**: Works with YouTube's auto-generated captions

## 🎬 Demo

![YouTube Summary Demo](assets/demo.gif)

*See the plugin in action: paste a YouTube URL, run `/youtube-summary`, and get an AI-generated structured summary instantly!*

## 📦 Installation

1. **Open Logseq**
2. Go to `...` (menu) → `Plugins` → `Marketplace`
3. Search for **"YouTube Summary"**
4. Click `Install`
5. The plugin will be ready to use immediately!

## Configuration

### Getting API Keys

Before using the plugin, you need an API key from your chosen provider:

| Provider | Get API Key |
|----------|-------------|
| **OpenAI** | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| **Anthropic** | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| **DeepSeek** | [platform.deepseek.com](https://platform.deepseek.com) |
| **Google Gemini** | [aistudio.google.com](https://aistudio.google.com) |
| **xAI Grok** | [console.x.ai](https://console.x.ai) |
| **Alibaba Qwen** | [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com) |
| **Moonshot** | [platform.moonshot.cn](https://platform.moonshot.cn) |

### Plugin Settings

1. In Logseq, go to `Settings` → `Plugins` → `YouTube Summary`
2. **Language**: Choose interface language or "Auto" to detect from Logseq settings
3. **Model**: Select from 18 available models (provider is auto-detected):
   - **OpenAI**: `gpt-4o-mini`, `gpt-4o`, `o1-mini`
   - **Anthropic**: `claude-sonnet-4-20250514`, `claude-opus-4-20250514`
   - **DeepSeek**: `deepseek-chat`, `deepseek-reasoner`
   - **Gemini**: `gemini-2.5-flash`, `gemini-2.5-pro`
   - **Grok**: `grok-3`, `grok-4`
   - **Qwen**: `qwen-turbo`, `qwen-plus`, `qwen-max`
   - **Moonshot**: `moonshot-v1-8k`, `moonshot-v1-32k`
4. **API Key**: Paste your API key from the selected model's provider

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
- ⚠️ **Requires API key**: You need a valid API key from one of the supported providers.
- ⚠️ **API costs**: Using LLM APIs may incur costs depending on your plan. Check pricing on each provider's official page.
- ⚠️ **Rate limits**: APIs have usage limits. If you exceed the limit, you'll need to wait before trying again.

## Error Handling

The plugin displays clear messages for different error types:

- **Invalid URL**: Verify the URL is from YouTube and in a valid format
- **No transcript**: The video doesn't have subtitles available
- **API key not configured**: Go to Settings to configure your API key
- **Invalid API key**: Verify you copied your API key correctly
- **Rate limit exceeded**: Wait a few minutes before trying again
- **Model not found**: Verify the model name is correct

## 💬 Feedback & Community

We'd love to hear from you! Here are the ways you can connect:

### 🐛 Report Bugs
Found a bug? [Create a bug report](https://github.com/rcontrerasv/logseq-youtube-summary/issues/new/choose) with detailed steps to reproduce.

### 💡 Request Features
Have an idea? [Start a discussion](https://github.com/rcontrerasv/logseq-youtube-summary/discussions/new?category=ideas) or [submit a feature request](https://github.com/rcontrerasv/logseq-youtube-summary/issues/new/choose).

### ❓ Get Help
- [Q&A Discussions](https://github.com/rcontrerasv/logseq-youtube-summary/discussions/categories/q-a) - Ask questions
- [Logseq Discord](https://discord.gg/KpN4eHY) - Join the community

### 🎉 Show and Tell
Share how you're using the plugin in our [Show and Tell](https://github.com/rcontrerasv/logseq-youtube-summary/discussions/categories/show-and-tell) section!

### ⭐ Like it?
If you find this plugin useful, give it a star on GitHub!

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
