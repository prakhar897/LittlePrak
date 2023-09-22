const vscode = require('vscode');
const os = require('os');
const platform = os.platform();

const config = require('../config.json');

const getTextFromCurrentLine = () => {
	const editor = vscode.window.activeTextEditor;
	const selection = editor.selection;
	const lineNumber = selection.active.line;
	const line = editor.document.lineAt(lineNumber);
	return line.text;
};

const getTextFromCurrentAndPreviousTwoLines = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
      return "";
  }

  const document = editor.document;
  const position = editor.selection.active;
  const currentLine = document.lineAt(position.line);
  const previousLine1 =
      position.line - 1 >= 0 ? document.lineAt(position.line - 1) : undefined;
  const previousLine2 =
      position.line - 2 >= 0 ? document.lineAt(position.line - 2) : undefined;
  const lines = [previousLine2, previousLine1, currentLine].flatMap(
      (l) => !!l && l.text
  );

  return lines.join("\n");
}

const escapeNewLine = (arg) => {
	if (platform.toLowerCase() === 'win32') {
		return arg.replaceAll(/\n/g, '\\n').replaceAll(/\r/g, '\\r');
	} else {
		return arg;
	}
};

const escapeDoubleQuotes = (arg) => {
	if (platform.toLowerCase() === 'win32') {
		return arg.replaceAll(/"/g, '`"');
	} else {
		return arg.replaceAll(/"/g, '\\"');
	}
};

const sanitizeText = (text) => {
	return escapeNewLine(escapeDoubleQuotes(text));
};

const showSuggestion = (text) => {
  console.log("Showing this as suggestion: " + text);
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const position = editor.selection.active;

		// Define the range for the decoration
		const range = new vscode.Range(position, position);

		// Define the decoration type
		const decorationType = vscode.window.createTextEditorDecorationType({
			before: {
				contentText:  "ABC\n\ndef\n\nIJK",
				color: "#646464",
				margin: "0px 5px 0px 0px"
			},
		});

		// Apply the decoration to the editor
		editor.setDecorations(decorationType, [range]);

		// Listen for keypress events
		const disposableListener = vscode.workspace.onDidChangeTextDocument(event => {
			if (decorationType) {
				decorationType.dispose();
			}
			disposableListener.dispose();
      config["currentPrompt"] = JSON.parse(JSON.stringify(config["resetPrompt"]));
      console.log("Text Change, Prompt Resetted. Current Prompt is now:" , config["currentPrompt"]);
		});

    config["currentPrompt"]["displayed"] = true;
	} else {
		vscode.window.showErrorMessage('No active text editor');
	}
};

module.exports = {
	getTextFromCurrentLine,
  getTextFromCurrentAndPreviousTwoLines,
	escapeNewLine,
	escapeDoubleQuotes,
	sanitizeText,
	showSuggestion
};
