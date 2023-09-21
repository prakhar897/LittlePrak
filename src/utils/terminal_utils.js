const vscode = require('vscode');

const getTerminalByName = (terminalName) => {
  var terminal = vscode.window.terminals.find(
    (t) => t.name === terminalName
  );

  return terminal;
}

const startLittlePrakTerminal = async (globalState) => {

  let terminalName = globalState.get('terminalName');

  var existingTerminal = getTerminalByName(terminalName);

  if (!existingTerminal) {
    existingTerminal = vscode.window.createTerminal(terminalName);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 sec so that the terminal can start
  }

  if (!globalState.get("existingTerminalPID")) {
    await existingTerminal.processId.then((pid) => {
      globalState.update("existingTerminalPID:",pid);
    });
  }
}

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

const setMaybeExistingTerminal = () => {
  existingTerminal = vscode.window.terminals.find(
      (t) => t.name === terminalName
  );

  if (existingTerminal) {
      if (!serverProcessId) {
          existingTerminal.processId.then((pid) => {
              serverProcessId = pid;
          });
      }
      return existingTerminal;
  } else {
      vscode.window
          .showErrorMessage("Can't reach Dalai server. Restart local server?", {
              title: "Restart",
              action: "restartServer",
          })
          .then((selection) => {
              if (selection?.action === "restartServer") {
                  vscode.commands.executeCommand("littlePrak.startDalai");
              }
          });
      return false;
  }
};

module.exports = {
  setMaybeExistingTerminal,
  startLittlePrakTerminal, 
  handleLittlePrakTerminalClosure,
  getTerminalByName
}