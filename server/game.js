import {toWS, handleErrorWS} from './util/ws';
import {createGameModel} from './gameModel';

const oneClientPerPlayer = false;

export function createGame() {
    const gameModel = createGameModel();

    let players = [];
    let nextPlayerIndex = 0;

    const oppositePlayerIndex = [1, 0];

    function sendState(socket) {
        const state = {
            board: gameModel.getBoard(),
            gameIsReady: players.length === 2,
            nextPlayer: players[nextPlayerIndex] === socket ? 'me' : 'opponent',
            gameOver: gameModel.isGameOver(),
            winner: gameModel.isGameOver() ? gameModel.getWinner() : void 0,
        };

        socket.send(toWS('game-state', state), handleErrorWS);
    }

    function placePiece(socket, {x, y}) {
        if (oneClientPerPlayer) {
            if (players.length == 1) {
                socket.send(toWS('error', { message: 'Game is not ready, waiting to find an opponent.' }), handleErrorWS);
                return;
            }
            if (players[nextPlayerIndex] !== socket) {
                socket.send(toWS('error', { message: 'It\'s not your turn, wait for your opponent to make their move.' }), handleErrorWS);
                return;
            }
        }
        if (gameModel.isTileOccupied(x, y)) {
            socket.send(toWS('error', { message: 'That tile is already occupied by another piece.' }));
            return;
        }

        const capturedAnyTiles = gameModel.placePiece(x, y);

        if (!capturedAnyTiles) {
            socket.send(toWS('error', { message: 'You must capture at least one tile from your opponent.' }));
            return;
        }

        nextPlayerIndex = oppositePlayerIndex[nextPlayerIndex];
        players.forEach(sendState);
    }

    return {
        addPlayer(socket) {
            if (players.length == 2) {
                socket.send(toWS('error', { message: 'Game is already full' }), handleErrorWS);
            }

            players.push(socket);
            players.forEach(sendState);

            socket.on('message', (data) => {
                const { id, payload } = JSON.parse(data);

                switch (id) {
                    case 'place-piece':
                        placePiece(socket, payload);
                        break;
                }
            });
        },
        removePlayer(socket) {
            players = players.filter(other => other !== socket);
        },
    };
}
