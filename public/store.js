//alon
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

    }

    

    start(player){

        this.hpButton = createButton('hp - 2');
        this.hpButton.position(0, 0);
        
        this.shieldButton = createButton('shield - 2');
        this.shieldButton.position(0, 20);

        this.shieldRegenButton = createButton('shieldRegen - 3');
        this.shieldRegenButton.position(0, 40); 

        this.reloadTimeButton = createButton('reloadTime - 2');
        this.reloadTimeButton.position(0, 60);

        this.bulletDamageButton = createButton('bulletDamage - 2');
        this.bulletDamageButton.position(0, 80);
        
        this.movementSpeedButton = createButton('movementSpeed - 3');
        this.movementSpeedButton.position(0, 100);

        this.bulletSpeedButton = createButton('bulletSpeed - 2');
        this.bulletSpeedButton.position(0, 120);

        this.hpRegenButton = createButton('hpRegen - 10');
        this.hpRegenButton.position(0, 140);

        //garbage powerup (purely cosmetic, scams player out of 100 points)
        this.joeBidenButton = createButton('joeBiden - 100');
        this.joeBidenButton.position(0,160);

        this.hpButton.mousePressed(hpButtonAction)
        function hpButtonAction() {
            player.hp += 100;
        }
        this.shieldButton.mousePressed(shieldButtonAction)
        function shieldButtonAction() {
            player.maxShield += 25;
        }
        this.shieldRegenButton.mousePressed(shieldRegenAction)
        function shieldRegenAction() {
            player.shieldRegen += 0.1;
        }
        this.reloadTimeButton.mousePressed(reloadTimeAction)
        function reloadTimeAction() {
            player.reloadTime -= 10;
        }
        this.bulletDamageButton.mousePressed(bulletDamageAction)
        function bulletDamageAction() {
            player.hp += 100;
        }
        this.movementSpeedButton.mousePressed(movementSpeedButtonAction)
        function movementSpeedButtonAction() {
            player.movementSpeed += 1;
        }
        this.bulletSpeedButton.mousePressed(bulletSpeedButtonAction)
        function bulletSpeedButtonAction() {
            player.hp += 100;
        }
        this.hpRegenButton.mousePressed(hpRegenButtonAction)
        function hpRegenButtonAction() {
            //no
            player.hp += 100;
        }
        this.joeBidenButton.mousePressed(joeBidenButtonAction)
        function joeBidenButtonAction() {
            //no
            player.hp += 100;
        }

        

    }
}

