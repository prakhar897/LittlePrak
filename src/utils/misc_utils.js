const vscode = require('vscode');

const initializeGlobalState =  (config, globalState) => { 
  console.log("Initializing State");

  for (let key in config) {
    globalState.update(key,config[key]);
  }

} 

module.exports = {
  initializeGlobalState
}
