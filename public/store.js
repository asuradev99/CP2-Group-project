class Store{
    constructor(){
        let ReloadUpgradeCost = 1000;
        let SpeedUpgradeCost = 1000;
    }
    goToMainPage(){
        select('#defaultCanvas0').hide();
    }
    Display(){
        createCanvas(400, 400);
        // create the exit button
        let exitButton = createButton('Exit');
        exitButton.position(width - 70, 20);
        exitButton.mousePressed(goToMainPage);
    }
}