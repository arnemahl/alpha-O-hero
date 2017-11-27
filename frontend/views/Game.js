var websocket = require('/util/websocket').websocket;
var toWS = require('/util/websocket').toWS;

var Game = {
    view: function(vnode) {
        return m('svg', {
            width: 800,
            height: 800,
            viewBox: '0 0 800 800'
        }, [
            vnode.attrs.board.map((column, x) =>
                column.map((tile, y) => [
                    m('rect', {
                        x: 100*x,
                        y: 100*y,
                        width: 100,
                        height: 100,
                        fill: 'green',
                        stroke: 'black',
                        strokeWidth: 1,
                        onclick: () => websocket.send(toWS('place-piece', {x, y}))
                    }),
                    tile === 'empty tile'
                        ? void 0
                        : m('circle', {
                            cx: 100*x + 50,
                            cy: 100*y + 50,
                            r: 40,
                            fill: tile
                        })
                ])
            )
        ]);
    }
};

module.exports = Game;
