const vscode = require('vscode');
const {
	startLittlePrakTerminal,
	handleLittlePrakTerminalClosure,
	getTerminalByName
} = require('../utils/terminal_utils');
const config = require('../config.json');

async function startServerCommand() {
	console.log('Starting Dalai Server');

	const startServerCommand = 'npx dalai serve';
	const stopServerCommand = '\x03'; // ^C Command

	await startLittlePrakTerminal();

	let existingTerminal = getTerminalByName(config['terminalName']);

	existingTerminal.sendText(stopServerCommand);
	existingTerminal.sendText(startServerCommand);
	vscode.window.showInformationMessage('Starting Dalai Server');

	handleLittlePrakTerminalClosure();

	existingTerminal.show();
}

function stopServerCommand() {
	console.log('Stopping Dalai Server');
	console.log(config);

	let existingTerminal = getTerminalByName(config['terminalName']);
	if (existingTerminal) {
		existingTerminal.dispose();
		config['existingTerminal'] = null;
		config['existingTerminalPID'] = null;
		vscode.window.showInformationMessage('Stopped Dalai Server');
	} else {
		vscode.window.showInformationMessage('Dalai Server is not running');
	}
}

module.exports = {
	startServerCommand: startServerCommand,
	stopServerCommand: stopServerCommand
};
