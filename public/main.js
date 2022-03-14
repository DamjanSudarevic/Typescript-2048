"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const Grid_1 = __importDefault(require("./modules/Grid"));
const Tile_1 = __importDefault(require("./modules/Tile"));
const root = document.getElementById("game");
if (root == null)
    (0, process_1.exit)(1);
const scoreBoard = document.createElement('div');
scoreBoard.classList.add("score-board");
const scoreLabel = document.createElement('div');
scoreLabel.classList.add("label");
scoreLabel.textContent = "Score";
const score = document.createElement('div');
score.classList.add("label", "bold");
score.textContent = '0';
scoreBoard.append(scoreLabel, score);
root.append(scoreBoard);
const gameBoard = document.createElement('div');
gameBoard.classList.add("game-board");
root.append(gameBoard);
const grid = new Grid_1.default(gameBoard);
grid.randomEmptyCell().tile = new Tile_1.default(gameBoard);
grid.randomEmptyCell().tile = new Tile_1.default(gameBoard);
