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

  let text = "";
  lines.forEach((line) => {
    if(line != false){
      text += line; 
      text += "\n";
    }
  })

  return text;
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

const showSuggestion = async  (text) => {
   
  console.log("Showing this as suggestion: " + text);
	const editor = vscode.window.activeTextEditor;
	if (editor) {

    var lines = text.split("\n");
    let cursorLine = editor.selection.active.line;
    let cursorCharacter = editor.selection.active.character;
    let decorationList = [];

    lines.forEach((line) => {
      let start = new vscode.Position(cursorLine,cursorCharacter);
      let end = new vscode.Position(cursorLine,cursorCharacter+line.length);

      const range = new vscode.Range(start, end);

      const decorationType = vscode.window.createTextEditorDecorationType({
        before: {
          contentText:  line,
          color: "#646464",
          margin: "0px 5px 0px 0px"
        },
      });

      decorationList.push(decorationType);

      editor.setDecorations(decorationType, [range]);
      cursorLine++;
      
    })
		

		// Listen for keypress events
		const disposableListener = vscode.workspace.onDidChangeTextDocument(event => {
			decorationList.forEach((decorationType) => {
        decorationType.dispose();
      });
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
