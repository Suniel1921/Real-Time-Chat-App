const socket = io();

let names;
let textarea = document.querySelector('#textarea');
let messagearea = document.querySelector('.message__area')

do{
    names = prompt("Enter your name :");
}while(!names);

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user : names,
        message : message.trim()
    }

    //append

    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom()

    //send to server via socket io

    socket.emit('message', msg)

}


function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}<h4/>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);

}

//recieve message

socket.on('message',(msg)=>{
    // console.log(msg)

    appendMessage(msg, 'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messagearea.scrollTop = messagearea.scrollHeight;
}