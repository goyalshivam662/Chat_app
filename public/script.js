let chatInput = document.querySelector(".chat-input");
let chatwindow = document.querySelector(".chat-window");

let myName = document.querySelector(".me .user-name");


let username = prompt("enter your name");

myName.textContent = username;
chatInput.addEventListener("keypress",function(e){

if(e.key == "Enter"){

    let chatDiv  = document.createElement("div");

    chatDiv.classList.add("chat");
    chatDiv.classList.add("right");

    chatDiv.textContent = username + " : "+ chatInput.value;
  chatwindow.append(chatDiv);

  // emit  chat,username message to server
  socket.emit("chat", {username: username ,chat : chatInput.value})

  chatInput.value =" ";
}

})


