export function getPossibleMoves(gameState) {
    ...
}

export function getNextState(gameState, move) {
    ...
}

function isGameOver(state) {
    ...
}

export function createGame() {
    let state = ...;

    return {
        isOver() {
            isGameOver(state)
        },
        applyMove(move) {
            state = getNextState(state, move);
        },
        getState() {
            return state;
        }
    };
}
