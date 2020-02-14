var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs")
app.use(express.static('public'));
app.use(express.static('.'));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(5000);


var Grass = require('./public/grass.js');
var GrassEater = require('./public/grasseater.js');
var Predator = require('./public/predator.js');
var Person = require('./public/person.js');
var Animal = require('./public/animal.js');
var Hunter = require('./public/hunter.js');





matrix = [];

grassArr = []; //1
grassEaterArr = []; //2
predatorArr = []; //3
animalArr = []; //4
persArr = []; //5
hunterArr = []; //6


grassEaterCount = 0;
grassCount = 0;
predatorCount = 0;
weatherinit = 0;
weather = "Summer";


function matrixGenerator(l) {
    var m = [];
    for (var i = 0; i < l; i++) {
        m[i] = [];
        for (var j = 0; j < l; j++) {
            var rand = Math.floor(Math.random() * 160);
            if (rand <= 60) {
                m[i][j] = 1;
            } else if (rand > 60 && rand <= 80) {
                m[i][j] = 2;
            } else if (rand > 80 && rand <= 100) {
                m[i][j] = 3;
            } else if (rand > 100 && rand <= 120) {
                m[i][j] = 4
            } else if (rand > 120 && rand <= 140) {
                m[i][j] = 5;
            } else if (rand > 140 && rand <= 160) {
                m[i][j] = 6;
            } else {
                m[i][j] = 0;
            }
        }
    }
    return m;
}

matrix = matrixGenerator(20);
console.log(matrix, "matrix")
function creatingObjects() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
                grassCount++
            }
            else if (matrix[y][x] == 2) {
                var great = new GrassEater(x, y, 2);
                grassEaterArr.push(great);
                grassEaterCount++
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y, 3);
                predatorArr.push(pred);
                predatorCount++
            }
            else if (matrix[y][x] == 4) {
                var anim = new Animal(x, y, 4);
                animalArr.push(anim);

            }
            else if (matrix[y][x] == 5) {
                var per = new Person(x, y, 5);
                persArr.push(per);

            }

            else if (matrix[y][x] == 6) {
                var hunt = new Hunter(x, y, 7);
                hunterArr.push(hunt);

            }
        }
    }
}
creatingObjects();


function getweather() {
    weatherinit++;
    if (weatherinit == 6) {
        weatherinit = 0;
    }
    else if (weatherinit == 4) {
        weather = "Winter";
    }
    else if (weatherinit == 3) {
        weather = "Autumn";
    }
    else if (weatherinit == 1) {
        weather = "Spring";
    }
    else if (weatherinit == 2) {
        weather = "Summer";
    }
}


function start() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    } for (var i in animalArr) {
        animalArr[i].move();
    }
    for (var i in persArr) {
        persArr[i].eat();
    }

    for (var i in hunterArr) {
        hunterArr[i].eat();
    }

    let sendData = {
        matrix: matrix,
        grassCount: grassCount,
        grassEaterCount: grassEaterCount,
        predatorCount: predatorCount,
        weatherserver: weather
    }
    io.sockets.emit("data", sendData);

    io.on("connection", function (socket) {
        
        socket.on("fire", function (arr) {

            var x = arr[0];
            var y = arr[1];

            var directions = [
                [x - 1, y - 1],
                [x, y - 1],
                [x + 1, y - 1],
                [x - 1, y],
                [x + 1, y],
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1]
            ];

            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (y === grassArr[i].y && x === grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    };
                }
            } else if (matrix[y][x] == 2) {
                for (var i in grassEaterArr) {
                    if (y === grassEaterArr[i].y && x === grassEaterArr[i].x) {
                        grassEaterArr.splice(i, 1);
                        break;
                    };
                }
            }

            matrix[y][x] = 0;
            for (var i in directions) {
                let harevanx = directions[i][0];
                let harecvany = directions[i][1];

                if (matrix[harecvany][harevanx] == 1) {
                    for (var i in grassArr) {
                        if (y === grassArr[i].y && x === grassArr[i].x) {
                            grassArr.splice(i, 1);
                            break;
                        };
                    }
                } else if (matrix[harecvany][harevanx] == 2) {
                    for (var i in grassEaterArr) {
                        if (y === grassEaterArr[i].y && x === grassEaterArr[i].x) {
                            grassEaterArr.splice(i, 1);
                            break;
                        };
                    }
                }
                matrix[harecvany][harevanx] = 0;
            }

            io.sockets.emit("data", sendData);
        });


    });
}



var obj = { "info": [] };

function writefile() {
    var fileName = "Statics.json";
    obj.info.push({ "cnvac xoteri qanak ": grassCount });
    obj.info.push({ "cnvac xotakerneri qanak ": grassEaterCount });
    obj.info.push({ "cnvac gishatichneri qanak ": predatorCount });




    fs.writeFileSync(fileName, JSON.stringify(obj, null, 3));
}

setInterval(writefile, 1000)
setInterval(getweather, 1000)
setInterval(start, 600);



