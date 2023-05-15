// ayush and steven
class Store{
    // constructor(){
    //     let ReloadUpgradeCost = 1000;
    //     let SpeedUpgradeCost = 1000;
    // }
    // Display(){
    //     // steven
    //     let hidden = false;
    //     function gaming(){
    //         if(hidden){
    //             hidden = false;
    //             select('#defaultCanvas0').show()  
    //         } else{
    //             hidden = true;
    //             select('#defaultCanvas0').hide() 
    //             exitButton.hide
    //         }
    //     }

    //     // createCanvas(400, 400);
    //     // create the exit button
    //     let exitButton = createButton('Exit');
    //     exitButton.position(width - 70, 20);

    //     // steven
    //     exitButton.mousePressed( gaming);
    // }

    constructor(){
        // javascript is a great coding language!!!1!
        // const shopItems = new Array(
        //     ['hp',2],
        //     ['shield',2],
        //     ['shieldRegen',3],
        //     ['reloadTime',2],
        //     ['bulletDamage',2],
        //     ['bulletPenetration',3],
        //     ['movementSpeed',3],
        //     ['bulletSpeed',2],
        //     //one time
        //     ['hpRegen',10],
        //     ['vanguard party rule',10],
        //     //hidden item
        //     ['joeBiden',100]
        // );

        //let buttons = {}
        let hpButton;
        let shieldButton;
        let shieldRegenButton;
        let reloadTimeButton;
        let bulletDamageButton;
        let bulletPenetrationButton;
        let movementSpeedButton;
        let bulletSpeedButton;
        let hpRegenButton;
        let joeBidenButton;
        let cost;
    }

    

    start(player){
        
        this.hpButton = createButton('hp - 2');
        this.hpButton.position(0, 0);
        
        this.shieldButton = createButton('maxShield - 2');
        this.shieldButton.position(0, 20);

        this.shieldRegenButton = createButton('shieldRegen - 3');
        this.shieldRegenButton.position(0, 40); 

        this.reloadTimeButton = createButton('reloadTime - 2');
        this.reloadTimeButton.position(0, 60);

        this.bulletDamageButton = createButton('bulletDamage - 3');
        this.bulletDamageButton.position(0, 80);
        
        this.movementSpeedButton = createButton('movementSpeed - 3');
        this.movementSpeedButton.position(0, 100);

        this.bulletSpeedButton = createButton('bulletSpeed - 2');
        this.bulletSpeedButton.position(0, 120);

        this.hpRegenButton = createButton('hpRegen - 10');
        this.hpRegenButton.position(0, 140);

        //buy this to win the game (actually scams you out of 100 points)
        this.joeBidenButton = createButton('joeBiden - 100');
        this.joeBidenButton.position(0,160);

        this.hpButton.mousePressed(hpButtonAction)
        function hpButtonAction() {
        if (player.money>=2) {
            player.hp = 100;
            player.removeMoney(2)
        }
    }
        this.shieldButton.mousePressed(shieldButtonAction)
        function shieldButtonAction() {
            if (player.money>=2) {
            player.maxShield += 25;
            player.removeMoney(2)
            }
        }
        this.shieldRegenButton.mousePressed(shieldRegenAction)
        function shieldRegenAction() {
            if (player.money>=3) {
            player.shieldRegen += 0.1;
            player.removeMoney(3)
            }
        }
        this.reloadTimeButton.mousePressed(reloadTimeAction)
        function reloadTimeAction() {
            if (player.money>=2) {
            player.reloadTime -= 10;
            player.removeMoney(2)
            }
        }
        this.bulletDamageButton.mousePressed(bulletDamageAction)
        function bulletDamageAction() {
            if (player.money>=3) {
            player.laserDamage += 5;
            player.removeMoney(3)
            }
        }
        this.movementSpeedButton.mousePressed(movementSpeedButtonAction)
        function movementSpeedButtonAction() {
            if (player.money>=3) {
            player.movementSpeed += 1;
            player.removeMoney(3)
            }
        }
        this.bulletSpeedButton.mousePressed(bulletSpeedButtonAction)
        function bulletSpeedButtonAction() {
            if (player.money>=2) {
            player.laserSpeed += 1;
            player.removeMoney(2)
            }
        }
        this.hpRegenButton.mousePressed(hpRegenButtonAction)
        function hpRegenButtonAction() {
            //no
            if (player.money>=10) {
            player.hpRegen += 0.1;
            player.isHpRegen = true;
            player.removeMoney(10)
            }
        }
        this.joeBidenButton.mousePressed(joeBidenButtonAction)
        function joeBidenButtonAction() {
            if (player.money>=100) {
                player.removeMoney(100)
            var para = document.createElement("p");
            var text = "YOU WIN!!!!!!!! 好工作！";

            var node = document.createTextNode(text);
            para.appendChild(node);
            elmnt = document.getElementById("bruh");
            elmnt.appendChild(para);

            var elmnt = document.getElementById("bruh");
            var img = document.createElement("img");
            bidensong.play();
            img.src = "./graphics/biden.jpg";
            var src = document.getElementById("bruh");
            src.appendChild(img);
            elmnt = document.getElementById("defaultCanvas0"); elmnt.remove();
            //outside of play field
            }
        }
    }
}

