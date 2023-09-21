const vscode = require('vscode');
const { startServerCommand,stopServerCommand } = require('./server_commands');
const { generateSuggestions } = require('./suggestion_commands');


function registerCommands(context) {
    console.log("Registering Commands");
    var disposibleStartServer = vscode.commands.registerCommand(
        "littlePrak.startDalai",
        () => startServerCommand(context.globalState)
    );

    var disposibleStopServer = vscode.commands.registerCommand(
        "littlePrak.stopDalai",
        () => stopServerCommand(context.globalState)
    );

    var disposibleGenerateSuggestions = vscode.commands.registerCommand(
        "littlePrak.generateSuggestions",
        generateSuggestions
    );

    context.subscriptions.push(disposibleStartServer);
    context.subscriptions.push(disposibleStopServer);
    context.subscriptions.push(disposibleGenerateSuggestions);
}

module.exports = {
    registerCommands
};
