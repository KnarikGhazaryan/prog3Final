var LivingCreature = require("./livingcreature.js");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 30;
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
    mul() {
        this.multiply++;
        var cells = this.chooseCell(0);
        if (cells.length) {
            var newCell = cells[Math.random(0, cells.length) * 10];
            if (this.multiply >= 12 && newCell) {
                var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
                grassEaterArr.push(newGrassEater);
                matrix[newCell[1]][newCell[0]] = 2;
                this.multiply = 0;
            }
        }
    }

    move() {
        var cells = this.chooseCell(0);
        if (cells.length) {
            var newCell = cells[Math.floor(Math.random() * cells.length)];
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var cells = this.chooseCell(1);
        if (cells.length) {
            var newCell = cells[Math.floor(Math.random() * cells.length)];
            var newX = newCell[0];
            var newY = newCell[1];
            this.energy++
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    grassCount--
                    break;
                }

                if (weather == "Spring") {
                    if (this.energy > 40) {
                        this.mul()
                    }
                }
                else if (weather == "Summer") {
                    if (this.energy > 20) {
                        this.mul()
                    }
                }
                else if (weather == "Winter") {
                    if (this.energy > 100) {
                        this.mul()
                    }
                }
                else if (weather == "Autumn") {
                    if (this.energy > 50) {
                        this.mul()
                    }
                }
            }
        } else {
            this.energy--;
            this.move();
            if (this.energy < 1) {
                this.die();
            }
        }
    }
    die() {
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;

            }
        }
    }
}
