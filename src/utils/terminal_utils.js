const vscode = require('vscode');
const config = require('../config.json');


const getTerminalByName = (terminalName) => {
  var terminal = vscode.window.terminals.find(
    (t) => t.name === terminalName
  );

  return terminal;
}

const startLittlePrakTerminal = async () => {

  let terminalName = config['terminalName'];

  var existingTerminal = getTerminalByName(terminalName);

  if (!existingTerminal) {
    existingTerminal = vscode.window.createTerminal(terminalName);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 sec so that the terminal can start
  }

  if (!config["existingTerminalPID"]) {
    await existingTerminal.processId.then((pid) => {
      config["existingTerminalPID"] = pid;
    });
  }
}

// TODO: Check if this code works properly
const handleLittlePrakTerminalClosure = () => {
  // Handle closure
  vscode.window.onDidCloseTerminal((closedTerminal) => {
    if (closedTerminal.name === existingTerminal.name) {
      // Handle error
      if (closedTerminal.exitStatus?.code !== 0) {
        vscode.window.showErrorMessage(
          `Dalai server crashed unexpectedly`
        );
      } else {
        vscode.window.showInformationMessage(
          `Dalai server closed successfully`
        );
      }
    }
  });
}

module.exports = {
  startLittlePrakTerminal, 
  handleLittlePrakTerminalClosure,
  getTerminalByName
}