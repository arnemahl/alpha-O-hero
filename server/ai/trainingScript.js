/********************************************/
/*  Traning script                          */
/*                                          */
/*  Run this script to train solutions,     */
/*  i.e. develop AIs that can play Othello. */
/********************************************/

import * as nn from 'nn';
import { createSolution } from './solution';
import { playGame } from './gamePlayer';

let bestSolution;

function isNewBestSolution(solution) {
    const nofWins = []
        .concat(
            Array(200).fill().map(() => 0 + playGame(bestSolution, solution))
        )
        .concat(
            Array(200).fill().map(() => 1 - playGame(solution, bestSolution))
        )
        .reduce(sumTotal, 0);

    return nofWins >= (0.55 * 400);
}

function retrainNetwork(network, dataFromGames) {
    ...
}

function playAgainstItself(solution) {
    ...
}

export function trainSolution() {
    let keepTraining = true;

    bestSolution = createSolution(nn.random(/* dimensions */));

    while (keepTraining) {
        const dataFromGames = playAgainstItself(bestSolution);
        const newNetwork = retrainNetwork(bestSolution.getNewtork(), dataFromGames);
        const newSolution = createSolution(newNetwork);

        if (isNewBestSolution(newSolution)) {
            bestSolution = newSolution;
        }
    }

    return bestSolution;
}
