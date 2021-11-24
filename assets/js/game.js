var playerName = window.prompt("What is your robot's name?");
playerHealth = 100;
playerAttack = 10;
playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
var randomNumber = function (min, max){
    var value = Math.floor(Math.random()* (max - min + 1)) + min;

    return value;
};
var fight = function (enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    //Asking player if they want to fight or run
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );
    //Log a resulting message of their choice
    console.log("Player has chosen " + promptFight);
    // if player picks skip confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      //confirm players wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
      //if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    //remove enemy's health by subtracting the amount set in the playerAttack variable
    var damage = randomNumber (playerAttack - 3, playerAttack);
    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
      playerName +
        " attacked " +
        enemyName +
        ". " +
        enemyName +
        " now has " +
        enemyHealth +
        " health remaining"
    );

    //check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }
    //remove player's health by subtracting the amout set in enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemyName +
        " attacked " +
        playerName +
        ". " +
        playerName +
        " now has " +
        playerHealth +
        " health remaining"
    );
    //check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};
//function to end a game
var endGame = function () {
  //if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        Math.max(0, playerMoney) +
        "."
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");
  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};
//shop function expression
var shop = function () {
    //ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? Please enter one: 'refill', 'upgrade', or 'leave' to make a choice");
    //use switch to carry out action
    switch (shopOptionPrompt){
        case"REFILL": //newcase
        case "refill": 
            if(playerMoney >= 7){
                window.alert("Refilling player's health by 20 for 7 dollars.");
                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else{
                window.alert("You don't have enough money!");
            }
            break;
        case "UPGRADE": //new case
        case "upgrade":
            if(playerMoney >= 7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            //increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
            }
            else{
                window.alert("You don't have enough money!");
            }
            break;
        case "LEAVE"://new case
        case "leave":
            window.alert("Leaving the shop.");
            //do nothign, so function will end
            break;
        default: 
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
  };
//function to start a new game
var startGame = function () {
  //reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;
  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      //let the player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      //pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];
      //reset enemyHealth before starting new fight
      enemyHealth = randomNumber(40, 60);
      //use debugger to pause script from running and check what's going on at that moment in the code
      //debugger;
      //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyName);
        if(playerHealth > 0 && i < enemyNames.length-1){
            //ask if player wants to use the shop before the next round
            var storeConfirm = window.confirm("The fight is over, visit the shop before the next round?");
            //if yes, take them to the shop() function
            if(storeConfirm){
            shop();
            }
        }
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  //after loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};
//start the game when the page loads
startGame();
