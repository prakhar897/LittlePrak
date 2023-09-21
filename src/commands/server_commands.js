const vscode = require('vscode');
const { startLittlePrakTerminal, handleLittlePrakTerminalClosure, getTerminalByName } = require('../utils/terminal_utils');

async function startServerCommand(globalState) {
  console.log("Starting Dalai Server");

  const startServerCommand = "npx dalai serve";
  const stopServerCommand = "\x03"; // ^C Command

  await startLittlePrakTerminal(globalState);


  let existingTerminal = getTerminalByName(globalState.get("terminalName"));


  existingTerminal.sendText(stopServerCommand);
  existingTerminal.sendText(startServerCommand);
  vscode.window.showInformationMessage("Starting Dalai Server");

  handleLittlePrakTerminalClosure();
      
  existingTerminal.show();

}

function stopServerCommand(globalState) {
  console.log("Stopping Dalai Server");

  let existingTerminal = getTerminalByName(globalState.get("terminalName"));
  if (existingTerminal) {
    existingTerminal.dispose();
    globalState.update("existingTerminal", null);
    globalState.update("existingTerminalPID", null);  
    vscode.window.showInformationMessage("Stopped Dalai Server");
  } else {
    vscode.window.showInformationMessage("Dalai Server is not running");
  }
}

module.exports = {
  startServerCommand: startServerCommand,
  stopServerCommand: stopServerCommand
}