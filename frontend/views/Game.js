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
                        fill: 'darkgreen',
                    }),
                    m('rect', {
                        x: 100*x + 5,
                        y: 100*y + 5,
                        width: 90,
                        height: 90,
                        fill: 'rgba(0, 0, 0, 0.09)',
                        stroke: 'rgba(255, 255, 255, 0.02)',
                        'stroke-width': 4,
                        onclick: () => websocket.send(toWS('place-piece', {x, y}))
                    }),
                    tile === 'empty tile'
                        ? void 0
                        : [
                            m('circle', {
                                cx: 100*x + 50,
                                cy: 100*y + 50,
                                r: 40,
                                fill: tile,
                                stroke: 'rgba(170, 170, 170, 0.1)',
                                'stroke-width': 5
                            }),
                            m('circle', {
                                cx: 100*x + 50,
                                cy: 100*y + 50,
                                r: 29,
                                fill: 'rgba(170, 170, 170, 0.09)',
                                stroke: 'rgba(170, 170, 170, 0.06)',
                                'stroke-width': 3
                            })
                        ]
                ])
            )
        ]);
    }
};

module.exports = Game;
