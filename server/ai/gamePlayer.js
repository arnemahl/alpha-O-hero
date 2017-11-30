import { createGame } from './game';

export function playGame(solutionOne, solutionTwo) {
    const game = createGame();

    const solutions = [solutionOne, solutionTwo];
    let index = -1;

    while (!game.isOver()) {
        index = (index + 1 % 2);
        game.applyMove(solutions[index].getNextMove(game.getState()));
    }

    return game.getIndexOfWinner();
}
