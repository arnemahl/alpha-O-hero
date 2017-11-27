function toWS(id, payload) {
    return JSON.stringify({ id: id, payload: payload });
}

function createWebsocket(path) {
    var websocketProtocol = (location.protocol === 'https:') ? 'wss:' : 'ws:';
    var websocketUrl = `${websocketProtocol}//${location.host}/${path}`;
    var ws = new WebSocket(websocketUrl);

    ws.onclose = function socketClosed(ev) {
        if (ev.reason) {
            console.warn(ev.reason)
        }
    }

    return ws;
}

var websocket = createWebsocket('');

var listeners = {};

websocket.on = function (id, callback) {
    if (!listeners[id]) {
        listeners[id] = [];
    }
    listeners[id].push(callback);
}
websocket.off = function (id, callback) {
    listeners[id] = listeners[id].filter(listener => listener !== callback);
}

websocket.onmessage = function (event) {
    var data = JSON.parse(event.data);

    (listeners[data.id] || []).forEach(function (listener) {
        listener(data.payload);
    });
}

module.exports = {
    toWS,
    websocket
};
