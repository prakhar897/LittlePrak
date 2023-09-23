const vscode = require("vscode");

const config = require('../config.json');

const { sanitizeText } = require("./editor_utils");
const {socketEmitConnected } = require("../services/sockets");

const submitDalaiRequest = (prompt) => {
  console.log("Submitting Dalai Request");
	prompt = sanitizeText(prompt);
	socketEmitConnected("request", {
		...config["dalaiModelConfig"],
		...config["currentPrompt"],
		prompt,
	});
};

const createLLMPromptForGeneratingSuggestion = (input) => {
  const editor = vscode.window.activeTextEditor;
  const language = editor.document.languageId;

  let prompt =  `Complete the following ${language} code:` + input;
  console.log("Dalai Prompt:" , prompt);
  return prompt;
};

module.exports = {
	createLLMPromptForGeneratingSuggestion,
	submitDalaiRequest,
};
