var LivingCreature = require("./livingcreature.js");

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 30;
        this.multiply = 0;

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
            if (this.multiply >= 8 && newCell) {
                var newPredator = new (newCell[0], newCell[1], this.index);
                predatorArr.push(newPredator);
                matrix[newCell[1]][newCell[0]] = 3;
                this.multiply = 0;
                predatorCount++
            }
        }
    }

    move() {
        var cells = this.chooseCell(0);
        if (cells.length) {
            var newCell = cells[Math.floor(Math.random() * cells.length)];
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var cells = this.chooseCell(2);
        if (cells.length) {
            var newCell = cells[Math.floor(Math.random() * cells.length)];
            var newX = newCell[0];
            var newY = newCell[1];
            this.energy++
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 2);
                    grassEaterCount--
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

            this.mul()
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
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                predatorCount--
                break;

            }
        }
    }
}
