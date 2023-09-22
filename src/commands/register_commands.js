const vscode = require('vscode');
const { startServerCommand,stopServerCommand } = require('./server_commands');
const { generateSuggestions, completeSuggestion } = require('./suggestion_commands');


function registerCommands(context) {
    console.log("Registering Commands");
    var disposibleStartServer = vscode.commands.registerCommand(
        "littlePrak.startDalai",
        () => startServerCommand()
    );

    var disposibleStopServer = vscode.commands.registerCommand(
        "littlePrak.stopDalai",
        () => stopServerCommand()
    );

    var disposibleGenerateSuggestions = vscode.commands.registerCommand(
        "littlePrak.generateSuggestions",
        generateSuggestions
    );

    var disposibleCompleteSuggestion = vscode.commands.registerCommand(
      "littlePrak.completeSuggestion",
      completeSuggestion
  )

    context.subscriptions.push(disposibleStartServer);
    context.subscriptions.push(disposibleStopServer);
    context.subscriptions.push(disposibleGenerateSuggestions);
    context.subscriptions.push(disposibleCompleteSuggestion);
}

module.exports = {
    registerCommands
};
