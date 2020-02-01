
function main() {
   var socket = io();
   var button = document.getElementById('submit');
   var input = document.getElementById('message');
   var chat = document.getElementById('chat');
   function clickHandler() {
      if (input.value != '') {
         socket.emit('send_message', input.value)
      };

   }
    function getMessage(message) {
      var p = document.createElement('p');
      p.innerText = message;
      chat.appendChild(p);
   };

   socket.on('recieved_message', getMessage);

   button.onclick = clickHandler;
}

window.onload = main;