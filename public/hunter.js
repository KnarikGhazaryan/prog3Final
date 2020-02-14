var LivingCreature = require("./livingcreature.js");

module.exports = class Hunter extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 12;
    }

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
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var cells = this.chooseCell(3);
        if (cells.length) {
            var newCell = cells[Math.floor(Math.random() * cells.length)];
            var newX = newCell[0];
            var newY = newCell[1];
            this.energy++
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 3);
                    break;
                }
            }
        } else {
            this.energy--;
            this.move();
            if (this.energy < 2) {
                this.die();
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in hunterArr) {
            if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                hunterArr.splice(i, 1);
                break;
            }
        }
    }
}
