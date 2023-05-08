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
        let vanguardPartyRuleButton;
        let joeBidenButton;
    }

    init(){
        this.hpButton = createButton('hp');
        this.hpButton.position(0, 0);
        this.shieldButton = createButton('shield');
        this.shieldButton.position(0, 20);
        this.shieldRegenButton = createButton('shieldRegen');
        this.shieldRegenButton.position(0, 40); 
        this.reloadTimeButton = createButton('reloadTime');
        this.reloadTimeButton.position(0, 60);
        this.bulletDamageButton = createButton('bulletDamage');
        this.bulletDamageButton.position(0, 80);
        this.bulletPenetrationButton = createButton('bulletPenetration');
        this.bulletPenetrationButton.position(0, 100); 
        this.movementSpeedButton = createButton('movementSpeed');
        this.movementSpeedButton.position(0, 120);
        this.bulletSpeedButton = createButton('bulletSpeed');
        this.bulletSpeedButton.position(0, 140);
        this.hpRegenButton = createButton('hpRegen');
        this.hpRegenButton.position(0, 160);
        this.vanguardPartyRuleButton = createButton('vanguard party rule');
        this.vanguardPartyRuleButton.position(0, 180);
        this.joeBidenButton = createButton('joeBiden');
        this.joeBidenButton.position(0, 200);
    
    }
}