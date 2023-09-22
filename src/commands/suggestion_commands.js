const vscode = require('vscode');
const {getTerminalByName } = require('../utils/terminal_utils');
const {getTextFromCurrentAndPreviousTwoLines} = require('../utils/editor_utils');
const {createLLMPromptForGeneratingSuggestion, submitDalaiRequest} = require('../utils/llm_utils');

const config = require('../config.json');

const generateSuggestions = () => {
    console.log('Generating suggestions');
    const terminal = getTerminalByName(config["terminalName"]);
    if (!terminal || !config["existingTerminalPID"]) {
      vscode.window.showErrorMessage(
        `Terminal Does'nt exist. Please Start one.`
      );
      return;
    }

    const prompt = createLLMPromptForGeneratingSuggestion(getTextFromCurrentAndPreviousTwoLines());
    submitDalaiRequest(prompt);
}

const completeSuggestion = () => {
  console.log('Complete suggestion');
  if(config["currentPrompt"]["displayed"] == true){
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    const textToInsert = config["currentPrompt"]["token"];
    editor.edit(editBuilder => {
      editBuilder.insert(position, textToInsert);
    });
    config["currentPrompt"]["displayed"] = false;
  } else {
    console.log(config["currentPrompt"]);
  }
  

}

module.exports = {
    generateSuggestions,
    completeSuggestion
}