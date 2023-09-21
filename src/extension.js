const { registerCommands } = require("./commands/register_commands");
const { initializeGlobalState } = require("./utils/misc_utils");

const config = {
  terminalName: "littlePrak-dalai-terminal",
  existingTerminal: null,
  existingTerminalPID: null
};

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  console.log('Congratulations, your extension "littleprak" is now active!');

  initializeGlobalState(config, context.globalState);

  registerCommands(context);
}

function deactivate() {
  console.log("deactivated");
}

module.exports = {
  activate,
  deactivate,
};
