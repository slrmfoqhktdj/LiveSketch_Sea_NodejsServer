// const e = require("express");

// const webSocket = new WebSocket("ws://221.156.85.68:23232");
// const webSocket = new WebSocket("ws://121.178.114.99:20004");
const webSocket = new WebSocket("ws://192.168.0.7:30001");
  webSocket.onopen = function () {
    console.log('서버와 웹소켓 연결 성공!');

    const msg = {
      type: "join",
      id : 1
    };
  
    webSocket.send(JSON.stringify(msg));

  };
  webSocket.onmessage = function (event) {
    console.log("im client :"+event.data);
    // webSocket.send('클라이언트에서 서버로 답장을 보냅니다');
  };
  webSocket.onclose = function (event){
    
  }


let SelectValue = 0;
let map = new Map();
map.set(0,'shark.png')
map.set(1,'Stringray.png')
map.set(2,'Squid.png')
map.set(3,'Tuna.png')

$("#Shark_box").click(function(){
  SelectValue = 0;
  $('.MainImg').attr('src',map.get(SelectValue));
})

$("#Stringray_box").click(function(){
  SelectValue = 1;
  $('.MainImg').attr('src',map.get(SelectValue));
})

$("#Squid_box").click(function(){
  SelectValue = 2;
  $('.MainImg').attr('src',map.get(SelectValue));
})

$("#Tuna_box").click(function(){
  SelectValue = 3;
  $('.MainImg').attr('src',map.get(SelectValue));
})




$(".left").click(function(){
 
  if(SelectValue == 0){
    SelectValue = map.size -1;
  }else{
    SelectValue --;
  }
 
  $('.MainImg').attr('src',map.get(SelectValue));

})

$(".right").click(function(){
  
 if(SelectValue == map.size -1){
    SelectValue = 0;
  }else{
    SelectValue ++;
  }
 
  $('.MainImg').attr('src',map.get(SelectValue));
  
})


$(".sendC").click(function(){
  var msg = {
    type: "clinet",
    create : SelectValue
  };

  webSocket.send(JSON.stringify(msg));
})

