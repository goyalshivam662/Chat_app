let onlineList = document.querySelector(".online-list");

// it will send the message to server
socket.emit("userConnected",username);


socket.on("join",function(dataobj){
let joinDiv = document.createElement("div");
joinDiv.classList.add("chat");
joinDiv.classList.add("join");
joinDiv.textContent = `${dataobj.username} joined chat`;
chatwindow.append(joinDiv);

addInOnlineList(dataobj);

});

socket.on("online-list",function(userList){

  for(let i= 0 ; i< userList.length ; i++){
  
    if(userList[i].id != socket.id ){

 let userDiv = document.createElement("div");
 userDiv.classList.add("user");
 userDiv.setAttribute("id" ,userList[i].id);
 userDiv.innerHTML = `<div class="user-image">
      <img src="download.png" alt="">
  </div>
   <div class="user-name">${userList[i].username}</div> `
 onlineList.append(userDiv);
 
  }
}



//   <div class="user">
//  <div class="user-image">
//      <img src="download.png" alt="">
//  </div>
// <div class="user-name">steve</div>
// </div>

})

socket.on("leave",function(dataobj){
    let leftDiv = document.createElement("div");
    leftDiv.classList.add("chat");
    leftDiv.classList.add("leave");
    leftDiv.textContent = `${dataobj.username} leaved chat` ;
    chatwindow.append(leftDiv);

    deleteFromOnlineList(dataobj.id);

})
socket.on("chatleft",function(chatobj){
    let chatDiv  = document.createElement("div");

    chatDiv.classList.add("chat");
    chatDiv.classList.add("left");

    chatDiv.textContent = chatobj.username + " : "+ chatobj.chat;
  chatwindow.append(chatDiv);
})

function addInOnlineList(userObj){
  let userDiv = document.createElement("div");
  userDiv.classList.add("user");
  userDiv.setAttribute("id" ,userObj.id);
  userDiv.innerHTML = `<div class="user-image">
       <img src="download.png" alt="">
   </div>
    <div class="user-name">${userObj.username}</div> `
  onlineList.append(userDiv);
}

 function deleteFromOnlineList(id){
 document.querySelector(`#${id}`).remove();

}