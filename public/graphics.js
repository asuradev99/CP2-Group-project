
//steven and ethan
function renderLocationCircle(player) {
    var circx, circy;
    var dist;
    dist = player.findDistance(clientPlayer)
  
    let dx = abs(clientPlayer.x - player.x); 
    let dy = abs(clientPlayer.y - player.y);
  
    if(dy > window.innerHeight / 2 || dx > window.innerWidth / 2) {
  
      player.collisionCheck(clientPlayer);
      let smallerside = min(window.innerWidth, window.innerHeight);
      if(dist>smallerside/2){
        r = ((smallerside/2)-20) / dist
        circx = r * player.x + (1 - r) * clientPlayer.x;
        circy = r * player.y + (1 - r) * clientPlayer.y;
      }
      circle(circx, circy, 200/(dist/100));
      fill(0, 0, 0);
      text(player.playername, circx, circy);
      text(player.hp, circx, circy+20);
    }
  }



// ethan
function drawGrid() {
    let step = 100;
  
     //calculate starting and ending coordinates of the grid based on the position of the camera and the zoom level
     let left = -step + Math.ceil((clientPlayer.x - 1.5 * (canvas.width / 2)) / step) * step;
     let top = -step + Math.ceil((clientPlayer.y - 1.5 * (canvas.height / 2 )) / step) * step;
     let right = clientPlayer.x + 1.5 * (canvas.width / 2);
     let bottom = clientPlayer.y + 1.5 * (canvas.height / 2);
  
  
     strokeWeight(6);
     stroke(20);
  
     for (let x = left; x < right; x += step) {
        line(x, top, x, bottom);
     }
  
     for (let y = top; y < bottom; y += step) {
        line(left, y, right, y);
     }
  
  }



// steven
function leaderboard(){
    stroke(255,0,0)
    strokeWeight(6);
    let sortedPoints = [
     
    ];
    for(const id in positions){
      if(positions[id].hp > 0 && positions[id].playername.length > 0){
        temparray = [positions[id].playername, positions[id].points]
        sortedPoints.push(temparray)
      }
    }
  
  
    sortedPoints.sort(function(a, b) {
    
      if (a[1] > b[1]) return -1;
      if (a[1] < b[1]) return 1;
      return 0;
    });
  
  
    sortedPoints.unshift(['------------------', 9997])
  
    sortedPoints.unshift(
      ['LEADERBOARD', 9999])
  
  
    // console.log(sortedPoints)
  
    //steven
    let temptext = sortedPoints[0][0]
    text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3)
    temptext = sortedPoints[1][0]
    text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3+20)
    for(let i = 2; i<sortedPoints.length; i++){
      let temptext = sortedPoints[i][0]+': '+sortedPoints[i][1]
      text(temptext, clientPlayer.x+window.innerWidth/3, clientPlayer.y-window.innerHeight/3+20*i)
      //console.log('printing leaderboard: '+temptext)
   
    }
  }



//ayush 
function deathScreen() {
    sendKill(laserThatLastHitThePlayer, clientid);
      para = document.createElement("p");
      try{
      text = "you are dead, not big surprise, you were killed by "+positions[laserThatLastHitThePlayer].name;
      }catch{
        text = "you committed suicide"
      }
  
      // ayush
      diesound.play();
  
      node = document.createTextNode(text);
      para.appendChild(node);
      elmnt = document.getElementById("bruh");
      elmnt.appendChild(para);
      var img = document.createElement("img");
      if(Math.floor(Math.random()*2)==0){
        img.src = "./graphics/death png.png";
      } else{
        img.src = "./graphics/elon_game_over.png"
      }
      var src = document.getElementById("bruh");
      src.appendChild(img);
      elmnt = document.getElementById("defaultCanvas0"); elmnt.remove();
      0/0;
  }


  function renderUI() {

    //points bar
    textSize(50);
    stroke(255, 0, 0);
    strokeWeight(4)
    let poionts = "Points: " + clientPlayer.points;
    text(poionts, window.innerWidth / 2 - (poionts.length * 50 / 10), 40)

    //points bar
    textSize(20);
    stroke(255, 0, 0);
    strokeWeight(3)
    let moneytext = "Money: " + clientPlayer.money;
    text(moneytext, 0, 200, 40)
  }