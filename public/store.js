// ayush and steven
class Store{
    constructor(){
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
    }


    start(player){
        
        this.hpButton = createButton('hp - 4');
        this.hpButton.position(0, 0);
        
        this.shieldButton = createButton('maxShield - 4');
        this.shieldButton.position(0, 20);

        this.shieldRegenButton = createButton('shieldRegen - 6');
        this.shieldRegenButton.position(0, 40); 

        this.reloadTimeButton = createButton('reloadTime - 4');
        this.reloadTimeButton.position(0, 60);

        this.bulletDamageButton = createButton('bulletDamage - 6');
        this.bulletDamageButton.position(0, 80);
        
        this.movementSpeedButton = createButton('movementSpeed - 6');
        this.movementSpeedButton.position(0, 100);

        this.bulletSpeedButton = createButton('bulletSpeed - 4');
        this.bulletSpeedButton.position(0, 120);

        this.hpRegenButton = createButton('hpRegen - 20');
        this.hpRegenButton.position(0, 140);

        this.newTurretButton = createButton('new turret - 50');
        this.newTurretButton.position(0, 160);

        //buy this to win the game (actually scams you out of 100 points)
        this.joeBidenButton = createButton('joeBiden - 1000');
        this.joeBidenButton.position(0,180);

        this.hpButton.mousePressed(hpButtonAction)
        function hpButtonAction() {
        if (player.money>=4) {
            player.hp = 100;
            player.removeMoney(4)
        }
    }
        this.shieldButton.mousePressed(shieldButtonAction)
        function shieldButtonAction() {
            if (player.money>=4) {
            player.maxShield += 25;
            player.removeMoney(4)
            }
        }
        this.shieldRegenButton.mousePressed(shieldRegenAction)
        function shieldRegenAction() {
            if (player.money>=6) {
            player.shieldRegen += 0.1;
            player.removeMoney(6)
            }
        }
        this.reloadTimeButton.mousePressed(reloadTimeAction)
        function reloadTimeAction() {
            if (player.money>=4) {
            player.reloadTime -= 10;
            player.removeMoney(4)
            }
        }
        this.bulletDamageButton.mousePressed(bulletDamageAction)
        function bulletDamageAction() {
            if (player.money>=6) {
            player.laserDamage += 2;
            player.removeMoney(6)
            }
        }
        this.movementSpeedButton.mousePressed(movementSpeedButtonAction)
        function movementSpeedButtonAction() {
            if (player.money>=6) {
            player.movementSpeed += 0.25;
            player.removeMoney(6)
            }
        }
        this.bulletSpeedButton.mousePressed(bulletSpeedButtonAction)
        function bulletSpeedButtonAction() {
            if (player.money>=4) {
            player.laserSpeed += 1;
            player.removeMoney(4)
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
        this.newTurretButton.mousePressed(newTurretAction)
        function newTurretAction() {
            if(player.money >= 50) {

                let angle;
                while(true){
                    angle = window.prompt("angle?", "0");
                    if(parseInt(angle) != NaN){
                        break;
                    }
                }
                player.turrets.push(parseInt(angle))
                player.removeMoney(50)
            }
        }
        this.joeBidenButton.mousePressed(joeBidenButtonAction)
        function joeBidenButtonAction() {
            if (player.money>=1000) {
                player.removeMoney(1000)
                clientPlayer.isBiden = true;
            
            var para = document.createElement("p");
            var text = "YOU WIN!!!!!!!! 好工作！ YOU HAVE BEEN DRAFTED INTO THE UNITED STATES ARMY!!!!!!!!!";

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

