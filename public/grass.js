var LivingCreature = require("./livingcreature.js");

module.exports = class Grass extends LivingCreature {
    constructor(x, y) {
        super(x, y);
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
        this.multiply++
        let chooseCells = this.chooseCell(0);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        if (weather == "Summer") {
            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 1;
                let grass = new Grass(x, y);
                grassArr.push(grass);
                grassCount++
            }
        }
        else if (weather == "Spring") {
            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 1;
                let grass = new Grass(x, y);
                grassArr.push(grass);
                grassCount++
            }
        }
        else if (weather == "Winter") {
            if (newCell) {
                let x = newCell[0];
                let y = newCell[1];
                matrix[y][x] = 1;
                let grass = new Grass(x, y);
                grassArr.push(grass);
                grassCount++
            }
        }
    }
}

