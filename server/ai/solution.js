/**************************************/
/* Solution: An AI that plays Othello */
/**************************************/

import mcts from './mcts';
import { getPossibleMoves, getNextState } from './game';

function useNetworkToEvaluateState(network, gameState) {
    ...
}

export function createSolution({ network }) {
    return {
        getNetwork() {
            return network;
        },
        getNextMove(gameState) {
            // Do not need to know previous states like in Go,
            // so we just need a snapshot of the current state.

            return mcts.getNextMove({
                gameState,
                getPossibleMoves,
                getNextState,
                evaluateState: (gameState) => useNetworkToEvaluateState(network, gameState)
            });
        }
    };
}
