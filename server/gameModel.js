const EMPTY_TILE = 'empty tile';

const BLACK = 'black';
const WHITE = 'white';

const OPPOSITE_COLOR = {
    [BLACK]: WHITE,
    [WHITE]: BLACK,
};

export function createGameModel() {
    const board =
        Array(8).fill().map(() =>
            Array(8).fill().map(() =>
                EMPTY_TILE
            )
        );

    board[3][3] = WHITE;
    board[3][4] = BLACK;
    board[4][3] = BLACK;
    board[4][4] = WHITE;

    let emptyTiles = 60;
    let nextPlayerColor = BLACK;

    return {
        getBoard() {
            return board;
        },
        isTileOccupied(x, y) {
            return board[x][y] !== EMPTY_TILE;
        },
        placePiece(x, y) {
            if (board[x][y] !== EMPTY_TILE) {
                throw Error('Cannot place piece at (${x}, {y}), already occupied!');
            }

            // Flip opponent pieces if applicable
            function isOnBoard(pos) {
                return 0 <= pos.x && pos.x < 8
                    && 0 <= pos.y && pos.y < 8;
            }
            function add(one, two) {
                return {
                    x: one.x + two.x,
                    y: one.y + two.y,
                };
            }

            const playerColor = nextPlayerColor;
            const opponentColor = OPPOSITE_COLOR[playerColor];

            const linesThatEndedInOwnColor = [
                    {x:  1, y:  0}, // 0 deg
                    {x:  1, y:  1}, // 45 deg
                    {x:  0, y:  1}, // 90 deg
                    {x: -1, y:  1}, // 135 deg
                    {x: -1, y:  0}, // 180 deg
                    {x: -1, y: -1}, // 225 deg
                    {x:  0, y: -1}, // 270 deg
                    {x:  1, y: -1}, // 315 deg
                ].map(dir => {
                    const line = [];

                    for (let pos = add({x, y}, dir); isOnBoard(pos); pos = add(pos, dir)) {
                        const color = board[pos.x][pos.y];

                        line.push({ pos, color });

                        if (color !== opponentColor) {
                            return line;
                        }
                    }

                    return line;
                })
                .filter(line => line.length > 0)
                .filter(line => line.pop().color === playerColor);

            linesThatEndedInOwnColor
                .forEach(line => line.forEach(({ pos, color }) => {
                    board[pos.x][pos.y] = OPPOSITE_COLOR[color];
                }));

            const capturedAnyTiles = linesThatEndedInOwnColor.some(line => line.length > 0);

            if (!capturedAnyTiles) {
                return false;
            }

            // Place piece
            board[x][y] = nextPlayerColor;
            emptyTiles--;
            nextPlayerColor = OPPOSITE_COLOR[nextPlayerColor];

            return true;
        },
        isGameOver(x, y) {
            return emptyTiles === 0;
        },
        getWinner() {
            if (emptyTiles > 0) {
                return;
            }

            const blackScore = board.reduce(column => column.map(tile => tile === BLACK ? 1 : 0).reduce(sumTotal, 0), 0);

            return blackScore === 32 && 'TIE'
                || blackScore > 32 && 'BLACK'
                || blackScore < 32 && 'WHITE';
        },
    };
}
