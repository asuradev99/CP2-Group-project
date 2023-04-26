//alon
class Store{
    constructor(){
        let ReloadUpgradeCost = 1000;
        let SpeedUpgradeCost = 1000;
    }
    Display(){
        // steven
        let hidden = false;
        function gaming(){
            if(hidden){
                hidden = false;
                select('#defaultCanvas0').show()  
            } else{
                hidden = true;
                select('#defaultCanvas0').hide() 
                exitButton.hide
            }
        }

        // createCanvas(400, 400);
        // create the exit button
        let exitButton = createButton('Exit');
        exitButton.position(width - 70, 20);

        // steven
        exitButton.mousePressed( gaming);
    }
}