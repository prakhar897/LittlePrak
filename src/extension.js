const { registerCommands } = require("./commands/register_commands");
const { setupSocket } = require("./services/sockets");



/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  console.log('Congratulations, your extension "littleprak" is now active!');

  await setupSocket();
  await registerCommands(context);
}

function deactivate() {
  console.log("deactivated");
}

module.exports = {
  activate,
  deactivate,
};
