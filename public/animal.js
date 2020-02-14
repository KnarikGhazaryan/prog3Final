var LivingCreature = require("./livingcreature.js");

module.exports = class Animal extends LivingCreature {
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var cells = this.chooseCell(0);
        if (cells.length) {
            var newCell = cells[Math.floor(Math.random() * cells.length)];
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in animalArr) {
            if (this.x == animalArr[i].x && this.y == animalArr[i].y) {
                animalArr.splice(i, 1);
                break;
            }
        }
    }
}