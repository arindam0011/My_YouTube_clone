let playerContainer = document.getElementById("videoPlayer-container");

let player= sessionStorage.getItem("video");

if(player){
    let newPlayer= document.createElement("div");
    newPlayer.id = "newplayer";
    newPlayer.innerHTML = player;
    newPlayer.src+="?autoplay=1";
    playerContainer.append(newPlayer);

}
else{
    alert("video not found!");
}