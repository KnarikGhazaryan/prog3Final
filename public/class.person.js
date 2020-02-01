class Person extends LivingCreature {


    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
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

    move() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var newCell = random(this.chooseCell(4));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            this.energy++
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in animalArr) {
                if (newX == animalArr[i].x && newY == animalArr[i].y) {
                    animalArr.splice(i, 4);
                    break;
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
        matrix[this.y][this.x] = 0;
        for (var i in persArr) {
            if (this.x == persArr[i].x && this.y == persArr[i].y) {
                persArr.splice(i, 1);
                break;
            }
        }
    }
}
