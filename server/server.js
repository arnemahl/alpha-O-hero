import http from 'http';
import express from 'express';
import WebSocket from 'ws';

import {createGame} from './game';

const game = createGame();

/*******************************/
/***  Server with WebSocket  ***/
/*******************************/

const app = express();
const httpServer = http.Server(app);
const wsServer = new WebSocket.Server({ noServer: true });

app.use(express.static('frontend'));

httpServer.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, (ws) => {
        wsServer.emit('connection', ws);
    });
});

wsServer.on('connection', (socket) => {
    console.log('WebSocket: a user connected');

    function clearMode() {
        game.removePlayer(socket);
    }

    socket.on('message', (data) => {
        const { id, payload } = JSON.parse(data);

        switch (id) {
            case 'enter-player-mode':
                clearMode();
                game.addPlayer(socket);
                break;
        }
    });

    socket.on('close', () => {
        console.log('WebSocket: a user disconnected');
        clearMode();
    });
});

httpServer.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});

// Log startup and shutdown
console.log('Server started');

process.on('exit', () => {
    console.log('Server shutting down');
});
