const io = require('socket.io-client');

const config = require('../config.json');

const {showSuggestion} = require('../utils/editor_utils');

let socket = io('ws://localhost:3000');
const socketEmitConnected = (e, data) => {
	if (socket.connected) {
		socket.emit(e, data);
	}
};

const setupSocket = () => {
  socket = io("ws://localhost:3000");

  socket.on("connect", () => {
    console.log("Socket.io Client Connected");

    socket.on("disconnect", () => {
      console.log("Socket.io Client Disconnected");
    });

	socket.on("result", async ({ request, response }) => {
        handleResultEvent(request, response);
    });

    socket.on("connect_error", (error) => {
      handleSocketConnectError(error);
    });

    socket.on("error", (error) => {
      handleSocketError(error);
    });

    
  });
}

const handleResultEvent = (request, response) => {
	//console.log("Handling result event");
	// console.log(request);
	

	config["currentPrompt"]["token"] += response;
  

	if (response.includes("<end>")) {
		showSuggestion(config["currentPrompt"]["token"]);
	}


}

const handleSocketConnectError = (error) => {
	console.log("Handling Socket Connect Error");
	console.error("Socket.io Connect Error: " + error.toString());
  if (error.toString() === "Error: xhr poll error") {
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
  } else {
    vscode.window.showErrorMessage(
      "Socket.io Connect Error: " + error.toString()
    );
  }
}

const handleSocketError = (error) => {
	console.log("Handling Socket Error");
	console.log(error);
  vscode.window.showErrorMessage("Socket.io Error: " + error.toString());
}



module.exports = {
	socketEmitConnected,
	setupSocket
};
