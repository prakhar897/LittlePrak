const vscode = require('vscode');
const { startServerCommand, stopServerCommand } = require('./server_commands');
const {
	generateSuggestions,
	completeSuggestion
} = require('./suggestion_commands');
const { showSuggestion } = require('../utils/editor_utils');

function registerCommands(context) {
	console.log('Registering Commands');
	var disposibleStartServer = vscode.commands.registerCommand(
		'littlePrak.startDalai',
		() => startServerCommand()
	);

	var disposibleStopServer = vscode.commands.registerCommand(
		'littlePrak.stopDalai',
		() => stopServerCommand()
	);

	var disposibleGenerateSuggestions = vscode.commands.registerCommand(
		'littlePrak.generateSuggestions',
		generateSuggestions
	);

	var disposibleCompleteSuggestion = vscode.commands.registerCommand(
		'littlePrak.completeSuggestion',
		completeSuggestion
	);

	var disposibleDev = vscode.commands.registerCommand('littlePrak.dev', () =>
		showSuggestion('ABC\n\ndef\nijk')
	);

	// let disposableAutoSuggest = vscode.workspace.onDidChangeTextDocument((event) => {
  //       // Check if it's a text document change
  //       if (event.contentChanges.length > 0) {
  //           // Execute your command here
  //           vscode.window.showInformationMessage('Command executed on keystroke');
	// 		//generateSuggestions();
  //       }
  //   });

  //   context.subscriptions.push(disposableAutoSuggest);

	context.subscriptions.push(disposibleStartServer);
	context.subscriptions.push(disposibleStopServer);
	context.subscriptions.push(disposibleGenerateSuggestions);
	context.subscriptions.push(disposibleCompleteSuggestion);
	context.subscriptions.push(disposibleDev);
}

module.exports = {
	registerCommands
};
