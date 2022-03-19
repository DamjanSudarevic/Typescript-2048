var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Grid from "./modules/Grid.js";
import Tile from "./modules/Tile.js";
const root = document.createElement("div");
root.classList.add("game");
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
document.body.append(root);
const grid = new Grid(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
function addScore(value) {
    if (score.textContent === null)
        return;
    const maybeNumber = parseInt(score.textContent);
    const result = (maybeNumber === null) ? 0 : maybeNumber + value;
    score.textContent = result.toString();
}
function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true });
}
function handleInput(e) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (e.key) {
            case "ArrowUp":
                if (!canMoveUp()) {
                    setupInput();
                    return;
                }
                yield moveUp();
                break;
            case "ArrowDown":
                if (!canMoveDown()) {
                    setupInput();
                    return;
                }
                yield moveDown();
                break;
            case "ArrowLeft":
                if (!canMoveLeft()) {
                    setupInput();
                    return;
                }
                yield moveLeft();
                break;
            case "ArrowRight":
                if (!canMoveRight()) {
                    setupInput();
                    return;
                }
                yield moveRight();
                break;
            default:
                setupInput();
                return;
        }
        grid.cells.forEach((cell) => {
            const mergeResult = cell.mergeTiles();
            if (mergeResult == null)
                return;
            addScore(mergeResult);
        });
        const newTile = new Tile(gameBoard);
        grid.randomEmptyCell().tile = newTile;
        if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
            newTile.waitForTransition(true).then(() => {
                alert("You lose!");
            });
            return;
        }
        setupInput();
    });
}
setupInput();
function canMoveUp() {
    return canMove(grid.cellsByColumn);
}
function canMoveDown() {
    return canMove(grid.cellsByColumn.map(column => [...column].reverse()));
}
function canMoveLeft() {
    return canMove(grid.cellsByRow);
}
function canMoveRight() {
    return canMove(grid.cellsByRow.map(row => [...row].reverse()));
}
function canMove(cells) {
    return cells.some(group => {
        return group.some((cell, index) => {
            if (index === 0)
                return false;
            if (cell.tile == null)
                return false;
            const moveToCell = group[index - 1];
            return moveToCell.canAccept(cell.tile);
        });
    });
}
function moveUp() {
    return slideTiles(grid.cellsByColumn);
}
function moveDown() {
    return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()));
}
function moveLeft() {
    return slideTiles(grid.cellsByRow);
}
function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
}
function slideTiles(cells) {
    return Promise.all(cells.flatMap(group => {
        const promises = [];
        for (let i = 1; i < group.length; i++) {
            const cell = group[i];
            if (cell.tile == null)
                continue;
            let lastValidCell;
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j];
                if (!moveToCell.canAccept(cell.tile))
                    break;
                lastValidCell = moveToCell;
            }
            if (lastValidCell != null) {
                promises.push(cell.tile.waitForTransition());
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile;
                }
                else {
                    lastValidCell.tile = cell.tile;
                }
                cell.tile = null;
            }
        }
        return promises;
    }));
}
