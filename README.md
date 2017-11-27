# Alpha-O Hero

The goal of this project is to implement the learning mechanisms of AlphaGo Zero
in JavaScript and apply them to _O_ for [_Othello_ (aka. Reversi)](https://en.wikipedia.org/wiki/Reversi).

## Why Othello

Othello is similar to Go in a few ways:

* Players take alternating turns placing a piece of their own color (black or white) onto the board
* Sometimes the player captures tiles where the other player had placed a piece.\*
* Despite simple rules, the games are not trivial.

Go is vastly more complex than Othello \[1\]. Therefore, a JavaScript implementation of AlphaGo Zero,
adapted to Othello, migth be able to learn Othello in a comparatively short time.

\* In Othello board games, the pieces have different colors on each side so they can simply be flipped
when captured by the other player. In Go the stones are removed and repalced with stones of the other player.

\[1\] [Game complexity – Wikipedia](https://en.wikipedia.org/wiki/Game_complexity#Complexities_of_some_well-known_games)


## Codebase

This project ~~consists of~~ will consist of:

* A deep neural network
* A serverside script to train the neural net
* A frontend + backend system for playing Othello (either PvP or PvAI), or wathcing replays of AI matches.

### Libraries

* frontend: [require](https://github.com/letorbi/smoothie), mithril and WebSocket
* backend: node, express and ws


### Running the code

WIP: The first iteration is an implementaion of the game rules, allowing two human players to play against eachother (PvP).

<!-- #### Run server + frontend -->

1. `npm install`
2. `npm start`
3. http://localhost:5000
