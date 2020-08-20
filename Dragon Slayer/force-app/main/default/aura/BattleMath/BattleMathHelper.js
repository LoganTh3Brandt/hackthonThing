({
    /**
     * This method takes the component as the parameter, and will then
     * output the response from the dragon based on the previous action
     * taken by the dragon.
     */ 
    generateDragonResponse : function(component) {
        console.log('Inside generateDragonResponse');
        var returnValue;
        //This is the action the player took. Used in case of 
        //paralysis action
        var playerAction = component.get("v.playerAction");
        //This is the list of all responses the dragon can have
        //to ny input
        var checkValue = component.get("v.dragonResultList");
        console.log(checkValue);
        //Interupts the dragons action and gives the player the chance to
        //attack without being countered
        if(playerAction == "paralyze"){
            returnValue = checkValue[5];
            component.set("v.doesDragonAttack", "false");
            component.set("v.dragonAttackCounter", 3)
        }
        //If player didn't paralyze, use simple if statements to associate
        //the correct response to the input given.
        else{
            //var checkValue = component.get("v.dragonResultList");
            var attacks = component.get("v.dragonAttackList");
            var actions = component.get("v.dragonActionList");
            
            var damage = 0;
            
            var previousAction = component.get("v.displayNextAction");
            //Dragon did a claws attack
            if(previousAction == attacks[0]){
                returnValue = checkValue[0];
                component.set("v.doesDragonAttack", "true");
                //Calls another method within the helper method
                damage = this.getDamage("claws");
            }
            //Dragon did a tail attack
            else if(previousAction == attacks[1]){
                returnValue = checkValue[1];
                component.set("v.doesDragonAttack", "true");
                damage = this.getDamage("tail");
            }
            //Dragon did a tail attack.
            else if(previousAction == attacks[2]){
                returnValue = checkValue[2];
                component.set("v.doesDragonAttack", "true");
                damage = this.getDamage("bite");
            }
            //Dragon did a breath attack
            else if(previousAction == attacks[3]){
                returnValue = checkValue[3];
                component.set("v.doesDragonAttack", "true");
                damage = this.getDamage("breath");
            }
            //Dragon wanted to taunt the player
            else if(previousAction == actions[1]){
                returnValue = checkValue[4];
                component.set("v.doesDragonAttack", "false");
            }
            //Response for dragon recharging, and covers invalid inputs.
            else{
                returnValue = checkValue[6];
                component.set("v.doesDragonAttack", "false");
            }
        }
        console.log(returnValue);
        //Set the attribute to display the action and damage.
        component.set("v.displayCurrentAction", returnValue);
        component.set("v.dragonDamage", damage);
    },
    
    /**
     * This function takes a String that contains the attack type,
     * and calculates the damage according to what type of attack it was.
     */ 
    getDamage : function(input) {
        var num = 0;
        //claws attack Deals 7-9 damage
        if(input == "claws"){
            num = Math.floor(Math.random()*3+7);
        }
        //tail attack Deals 8-10 damage
        else if(input == "tail"){
            num = Math.floor(Math.random()*3+8);
        }
        //bite attack Deals 10-11 damage
        else if(input == "bite"){
            num = Math.floor(Math.random()*2+10);
        }
        //breath attack Deals 15-19 damage
        else{
            num = Math.floor(Math.random()*5+15);
        }
    	return num;
	},
    
    /**
     * This class uses a Random number generator to determine the 
     * next action the dragon will take.
     */ 
    generateNextDragonAction : function(component){
        var result;
    	var attacksLeft = parseInt(component.get("v.dragonAttackCounter"));
        //This is used to ensure the dragon can not attack more than
        //3 times in a row, and will say the dragon needs to recharge.
        if(attacksLeft > 2){
            attacksLeft = 0
            component.set("v.dragonAttackCounter", 0);
            var actions = component.get("v.dragonActionList");
            console.log(result);
            result = actions[0];
            console.log(result);
        }
        else{
            //The dragon will always attack after resting,
            //otherwise there is a default 70% chance the dragon will attack.
            var randNum = Math.floor(Math.random()*10);
            if(randNum < 7 || attacksLeft == 0){
                attacksLeft++;
                var attack = component.get("v.dragonAttackList");
                var randAttack = Math.floor(Math.random()*10);
                //There is a 40% chance of a claw attack
                if(randAttack < 4){
                    result = attack[0];
                }
                //There is a 30% chance for a tail attack
                else if(randAttack < 7){
                    result = attack[1];
                }
                //There is a 20% chance for a bite attack
                else if(randAttack < 9){
                    result = attack[2];
                }
                //There is a 10% chance for a breath attack.
                //The dragon will always need to recharge after a breath attack.
                else{
                    result = attack[3];
                    attacksLeft = 3;
                }
            }
            else{
                //30% of the time, the dragon will either taunt the player,
                //or it will need to recharge.
                attacksLeft = 0;
                var actions = component.get("v.dragonActionList");
                //Equal chance of either action occurring.
                var randAction = Math.floor(Math.random()*2);
                //The dragon will recharge.
                if(randAction < 1){
                    result = actions[0];
                }
                //The dragon will taunt the player.
                else{
                    result = actions[1];
                }
            }
        }
        console.log(result);
        component.set("v.displayNextAction", result);
        component.set("v.dragonAttackCounter", attacksLeft);
	},
    
    /*
     * This method will set the players response in the displayPlayerAction
     * component, and set it based on the num input given.
     */ 
    generatePlayerResponse : function(num, component){
        var playerstuff = component.get("v.playerActionList");
        var result;
        //Attack
        if(num == 0){
            result = playerstuff[0];
        }
        //Defend
        else if(num == 1){
            result = playerstuff[1];
        }
        //Fireball
        else if(num == 2){
            result = playerstuff[2];
        }
        //Paralysis Wand
        else{
            result = playerstuff[3];
        }
        component.set("v.displayPlayerAction", result);
    }
})