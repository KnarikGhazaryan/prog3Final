var matrix = [];
var side = 16;

var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var animalArr = [];
var persArr = [];

function setup() {
    function matrixGenerator(l) {
        var m = [];
        for (var i = 0; i < l; i++) {
            m[i] = [];
            for (var j = 0; j < l; j++) {
                var rand = random(0, 120);
                if (rand <= 30) {
                    m[i][j] = 1;
                } else if (rand > 30 && rand <= 50) {
                    m[i][j] = 2;
                } else if (rand > 50 && rand <= 60) {
                    m[i][j] = 3;
                } else if (rand > 60 && rand <= 80) {
                    m[i][j] = 4;
                } else if (rand > 80 && rand <= 100) {
                    m[i][j] = 5;
                } else {
                    m[i][j] = 0;
                }
            }
        }
        return m;
    }
    matrix = matrixGenerator(20);


    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var great = new GrassEater(x, y, 2);
                grassEaterArr.push(great);
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y, 3);
                predatorArr.push(pred);
            }
            else if (matrix[y][x] == 4) {
                var anim = new Animal(x, y, 4);
                animalArr.push(anim);
            }
            else if (matrix[y][x] == 5) {
                var per = new Person(x, y, 5);
                persArr.push(per);
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("#2fa14d");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("#f6ff00");
                rect(x * side, y * side, side, side);

            }
            else if (matrix[y][x] == 3) {
                fill("#e81313");
                rect(x * side, y * side, side, side);

            }
            else if (matrix[y][x] == 4) {
                fill("#7b7be0");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("#c14cd9");
                rect(x * side, y * side, side, side);
            }
        }
    }





    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in animalArr) {
        animalArr[i].move();
    }
    for (var i in persArr) {
        persArr[i].eat();
    }
}