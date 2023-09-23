# LittlePrak

[GitHub](https://github.com/prakhar897/LittlePrak) [Discord](https://github.com/prakhar897)

## Demo

![LittlePrak Demo](./assets/demo.mp4)

## Overview

**LittlePrak** is a Free and Open Source Local Alternative to Github CoPilot.

This VSCode Extension is designed to enhance your coding experience by providing intelligent autocompletions using Local LLM Models.

## Features

- **Smart Autocompletions**: littlePrak offers intelligent autocompletions that adapt to your coding style and the specific project you're working on. It suggests relevant code snippets, function names, and variable names, making coding faster and more efficient.

- **Context-Aware Suggestions**: The autocompletions are contextually aware and take into account the surrounding code, imported libraries, and your coding history. This ensures that the suggestions are accurate and aligned with your coding needs.

- **Suggestion Cycling**: You can cycle through all the suggestions until you find one that's appropriate.

- **Local LLama Integration**: littlePrak harnesses the power of Local LLama's advanced code analysis capabilities. The extension communicates with the Local LLama server running locally to provide real-time autocompletions based on the analysis of your codebase.

- **Remote LLM Integrations**: If you aren't able to run LLMs on your personal PC, you can also host them on a remote server and configure it to be used here.

- **Immense Customisation**: We provide the ability to customize all configurations.

## Prerequisites

1. You must have NodeJS installed in your system.

## Getting Started

Follow these steps to start using littlePrak with Local LLama:
 
1. Run this command to install dalai `sudo npm install -g dalai`
2. Run this command to install LLama 7B model: `npx dalai llama install 7B`
3. Install the littlePrak extension from the VS Code Marketplace.
4. Open your project and Press (Ctrl+Shift+P) or (Cmd+Shift+P).
5. Type "Start LittlePrak Server" and hit enter.
6. You're done.


## Configuration

You can configure littlePrak to suit your preferences. To access the configuration settings, navigate to `File` > `Preferences` > `Settings` and search for "littlePrak". Here, you can adjust settings related to autocompletion behavior, suggestion frequency, and more.

## Roadmap

1. Create an MVP using dalai server. [WIP]
2. Integrate oobagooba server api.
3. Add more configurations options.
4. Integrate options for remote servers.

## Feedback and Support

We value your feedback and are committed to improving your experience with littlePrak. If you encounter any issues, have suggestions for improvements, or want to share your success stories, please reach out to us through the [issue tracker](https://github.com/LittlePrak/issues).


## License

This project is licensed under the [MIT License](LICENSE).
