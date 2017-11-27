var websocket = require('/util/websocket').websocket;
var toWS = require('/util/websocket').toWS;
var Game = require('/views/Game');

websocket.onopen = function () {
    websocket.send(toWS('enter-player-mode'));
};

websocket.on('game-state', function (state) {
    m.render(document.body, m(Game, state));
});

websocket.on('error', function (error) {
    console.error(error.message);
});
