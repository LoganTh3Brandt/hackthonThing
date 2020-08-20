({
    /**
     * This method is called after any player action, and will handle 
     * their action, whether it's an attack or not.
     */ 
	handlePlayerAttack : function(component, event, helper) {
        console.log("Inside handlePlayerAttack");
        //Gets parameters passed into the method by the child component.
        let playerDoesDamage = event.getParam("playerDoesDamage");
        if(playerDoesDamage){
            let playerDamage = event.getParam("dragonDamage");
            console.log('Player Damage: ' + playerDamage);
            let currentHealth = parseInt(component.get("v.dragonHealth"));
            console.log(currentHealth);
            //Calculate damage by subtracting the health from the damage.
            let math = currentHealth - playerDamage;
            component.set("v.dragonHealth", math);
            //Calculates if the player has killed the dragon.
            if(math <= 0){
                component.set("v.end", "You have slain the Dragon!");
                component.set("v.battleOver", "true");
            }
        }
        let dragonDoesDamage = event.getParam("dragonDoesDamage");
        if(dragonDoesDamage){
            let dragonDamage = event.getParam("playerDamage");
            console.log('Dragon damage: ' + dragonDamage);
            let currentHealth = parseInt(component.get("v.playerHealth"));
            console.log(currentHealth);
            let math = currentHealth - dragonDamage;
            component.set("v.playerHealth", math);
            let win = component.get("v.dragonHealth");
            //Calculates if the dragon has killed the player and the player 
            //has killed the dragon. WILL OVERWRITE PREVIOUS COMPONENT SETTING
            if(math <= 0 && win <= 0){
                component.set("v.end", "You slay the Dragon with your dying breath!");
                component.set("v.battleOver", "true");
            }
            //Calculates if the dragon has killed the player and the player hasn't killed
            //the dragon.
            else if(math <= 0 && win > 0){
                component.set("v.end", "The Dragon laughs as he finishes you off!");
                component.set("v.battleOver", "true");
            }
        }
        //Have a turn counter, in case I want to use it later.
        let updateTurn = parseInt(component.get("v.turn")) + 1;
        component.set("v.turn", updateTurn);
	},
    
    /**
     * Attempt to have a button to restart the game. Does not work,
     * as it can't give players back their uses of the spells they used 
     * in the other component. AKA I don't know how to set it.
     */ 
    restart : function(component, event, helper) {
        component.set("v.playerHealth", 50);
        component.set("v.dragonHealth", 100);
        component.set("v.battleOver", "false");
    }
})