function setup() {

   socket = io();
   matrix = [];
   side = 16;


   let grassCountElement = document.getElementById('grassCount');
   let grassEaterCountElement = document.getElementById('grassEaterCount');
   let predatorCountElement = document.getElementById('predatorCount');
   let clientweather = document.getElementById('weather')


   socket.on("data", drawCreatures);


   function drawCreatures(data) {
      matrix = data.matrix;
      grassCountElement.innerText = data.grassCount;
      grassEaterCountElement.innerText = data.grassEaterCount;
      predatorCountElement.innerText = data.predatorCount;
      clientweather.innerText = data.weatherserver;
      
      
      createCanvas(matrix[0].length * side, matrix.length * side);
      background('#acacac');
      
      
      for (var y = 0; y < matrix.length; y++) {
         for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {

               if (data.weatherserver == "Winter") {
                  fill('white')
               }
               else if (data.weatherserver == "Autumn") {
                  fill('darkgreen')
               }
               else if (data.weatherserver == "Spring") {
                  fill('#4dff00')
               }
               else if (data.weatherserver == "Summer") {
                  fill('green')
               }


            }
            else if (matrix[y][x] == 2) {

               if (data.weatherserver == "Winter") {
                  fill('pink')
               }
               else if (data.weatherserver == "Autumn") {
                  fill('#d66eff')
               }
               else if (data.weatherserver == "Spring") {
                  fill('#FCF4A3')
               }
               else if (data.weatherserver == "Summer") {
                  fill('yellow')
               }
            }
            else if (matrix[y][x] == 3) {
               if (data.weatherserver == "Winter") {
                  fill('#07f7d7')
               }
               else if (data.weatherserver == "Autumn") {
                  fill('brown')
               }
               else if (data.weatherserver == "Spring") {
                  fill('orange')
               }
               else if (data.weatherserver == "Summer") {
                  fill('red')
               }
            }
            else if (matrix[y][x] == 4) {
               fill('#7b7be0')
            }
            else if (matrix[y][x] == 5) {
               fill('#c14cd9')
            }
            else if (matrix[y][x] == 6) {
               fill('brown')
            }
            else {
               fill('grey')
            }
            rect(x * side, y * side, side, side)
         }
      }
   }
}



function mousePressed() {
   var x = Math.floor(mouseX / side);
   var y = Math.floor(mouseY / side);
   var arr = [x, y];
   console.log(arr)
   if (arr[0] <= 49 && arr[0] >= 0 && arr[1] <= 49 && arr[1] >= 0) socket.emit("fire", arr)

}

