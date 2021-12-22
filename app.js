//Make the USS_Schwarzenegger object
let ussArnold = {
    name: "USS Arnold",
    hull: 20,
    firePower: 5,
    accuracy: 0.7,
    attack() {
        //attack using math.random for to determine is accuracy check
        let attackChance = Math.random();
        if (attackChance <= this.accuracy) {
            return true;
        } else {
            return false;
        }
    },
};

//Alien ship objects and give them random specs with constructor
class AlienShip {
    constructor(name, hull, firePower, accuracy) {
        this.name = name;
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy;
    }
    attack() {
        //attack using math.random for to determine is accuracy check
        let accuracyCheck = Math.random();
        if (accuracyCheck <= this.accuracy) {
            return true;
        } else {
            return false;
        }
    }
}

//battle simulation
let battleSimulation = (ussArnold, targetShip) => {
    let ships = [ussArnold, targetShip];
    let attack = false;
    let attacking = 0;
    let beingAttacked = 1;
    let temp;
    console.log("%c Battle Starts", "color:blue; font-weight:bold; font-size: 50px");
    //point index to alien ship slot to be attacked by arnold and will continue until the hull is no longer > 0
    while (ships[beingAttacked].hull > 0) {
        if (ships[beingAttacked].hull > 0) {
            console.log(
                `\n%c ${ships[attacking].name} now attacking ${ships[beingAttacked].name}`,
                "color: black; font-size: 20px;"
            );
            //attack the enemy ship
            attack = ships[attacking].attack();
            if (attack === true) {
                ships[beingAttacked].hull -= ships[attacking].firePower;
                console.log(
                    `%c Attack Successful! ${ships[beingAttacked].name} Hull is at ${ships[beingAttacked].hull}`,
                    "color: green; font-weight: bold; font-size: 20px;"
                );
            } else {
                console.log(
                    `%c Attack Unsuccessful! ${ships[beingAttacked].name} Hull is at ${ships[beingAttacked].hull}`,
                    "color: red; font-size: 20px;"
                );
            }
            //check hull strength
            if (ships[beingAttacked].hull <= 0) {
                console.log(
                    `%c ${ships[beingAttacked].name} is destroyed`,
                    "color: red; border: 1px solid grey; font-size: 30px;"
                );
                if (ships[beingAttacked] === ussArnold) {
                    ///if arnold is destroyed
                    alert("You lose");
                } else if (
                    //checks to see if the hull strength < 0 is the last alien ship
                    ships[beingAttacked].name === alienShips[alienShips.length - 1].name
                ) {
                    alert(`${ships[beingAttacked].name} destroyed!\nAll alien ships destroyed. Get to the Choppa`);
                }
                else {
                    gameObj.userInput = prompt(
                        `${alienShips[gameObj.targetShip].name} destroyed.\n${ussArnold.name
                        } Hull: ${ussArnold.hull
                        }\nWould you like to ATTACK the next ship or RETREAT from battle?`,
                        "ATTACK"
                    );
                    gameObj.targetShip += 1; //move to next alien ship in array
                    checkUserChoice(); //determines what happens 
                    return; //returns no value for battleSimulation function
                }
            } else {
                //switching places of the attacking/attacked ships for their turns
                temp = attacking;
                attacking = beingAttacked;
                beingAttacked = temp;
            }
        }
    }
};
// check user choice
let checkUserChoice = () => {
    let response = gameObj.userInput.toUpperCase();
    if (response === "ATTACK") {
        //we will start the battle with the first ship index 0
        battleSimulation(ussArnold, alienShips[gameObj.targetShip]);
    } else if (response === "RETREAT") {
        alert("You retreated your forces");
    } else {
        alert("Wrong input start over");
    }
};

//game object
let gameObj = {
    targetShip: 0,
    round: 0,
    userInput: ""
};

const alienShips = []; //six alien ships
const alienFirePowerValues = [2, 3, 4]; //firepower between 2 and 4
const alienAccValues = [0.6, 0.7, 0.8]; //accuracy between 0.6 and 0.8
const alienHullValues = [3, 4, 5, 6]; //hull between 3 and 6

//for loop that determines firepower,accuracy and hull of created alien ships
let createAlienShip = () => {
    for (let i = 0; i < 6; i++) {
        //creating 6 alien ships
        let name = "Alien Ship number" + (i + 1);
        //random value determines index value chosen for all attributes
        let firePower = alienFirePowerValues[Math.floor(Math.random() * 3)];
        let accuracy = alienAccValues[Math.floor(Math.random() * 3)];
        let hull = alienHullValues[Math.floor(Math.random() * 4)];
        //Pushing constructed objects into a predefined array.
        alienShips[i] = new AlienShip(name, hull, firePower, accuracy);
    }
};

const startGame = () => {
    //create the alien ships
    createAlienShip();
    gameObj.userInput = prompt("Do you want to ATTACK the first ship or RETREAT?", "ATTACK");
    checkUserChoice();
};
//we load the game from here
startGame();
