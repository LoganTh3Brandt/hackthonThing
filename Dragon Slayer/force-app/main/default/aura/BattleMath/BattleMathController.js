({
    /**
     * This method initializes the four arrays of values 
     * for the actions the player and dragon can take,
     * as well as their consequences.
     */ 
    doInit : function(component, event, helper) {
        console.log('Initializing');
        //This is the list of attack actions for the dragon
        var s = [];
        s.push('The dragon draws back its claws.'); //6-8
        s.push('You can see the dragon swinging its tail towards you.');// 7-9
        s.push('You see the dragon coming in for a bite attack.');// 8-10
        s.push('The dragon begins charging up for a breath attack.');// 15-20
        console.log(s);
        component.set("v.dragonAttackList", s);
        
        //The list of non-attack actions for the dragon
        var actions = [];
        actions.push('The dragon needs to recharge after it’s last move');
        actions.push('The dragon looks like it wants to taunt you, puny human.');
        console.log(actions);
        component.set("v.dragonActionList", actions);
        
        //The list of responses to the dragon's actions
        var results = [];
        results.push('The dragon rakes you with its claws!');
        results.push('The dragon swings its tail at you!');
        results.push('The dragon descends towards you and bites you!');
        results.push('The dragon unleashes a wave of fire at you!');
        results.push('The dragon insults and demoralizes you!');
        results.push('The dragon is unable to move after being paralyzed!');
        results.push('The dragon has recharged and is ready to attack!');
        console.log(results);
        component.set("v.dragonResultList", results);
        
        //The list of responses to the dragon's actions
        var player = [];
        player.push('You swing your sword at the dragon!');
        player.push('You raise your shield to defend against the dragon!');
        player.push('You cast a fireball, and hurl it at the dragon!');
        player.push('You take out your wand and use its ability to paralyze the dragon!');
        console.log(player);
        component.set("v.playerActionList", player);
    },    
    /*
     * This is the action the player takes when they press
     * the attack action
     */ 
	playerAttack : function(component, event, helper) {
        console.log("Inside playerAttack");
        component.set("v.playerAction", "attack");
        let customEvent = component.getEvent("customEvent");
        //Damage from this will deal 8-12 damage.
        var num = Math.floor(Math.random() * 5) + 8;
        //This will generate the response for the next dragon action
        helper.generateDragonResponse(component);
        //Get what the damage was, is 0 if no attack. Both are set in helper method
        var dragAttack = component.get("v.doesDragonAttack");
        var dragDamage = parseInt(component.get("v.dragonDamage"));
        console.log("generated a response");
        //Parameters:
        //playerDoesDamage: is the player dealing damage with this choice?
        //dragonDamage: How much damage is being dealt TO the dragon BY the player?
        //dragonDoesDamage: is the dragon dealing damage with this choice?
        //playerDamage: How much damage is being dealt TO the player BY the dragon?
        customEvent.setParams({
            "playerDoesDamage" : true,
            "dragonDamage" : num,
            "dragonDoesDamage" : dragAttack,
            "playerDamage" : dragDamage
        });
        console.log(num);
        //Get the next response from the dragon.
        helper.generateNextDragonAction(component);
        //Get the response from the player.
        helper.generatePlayerResponse(0, component);
        customEvent.fire();
	},
    
    /*
     * This is the action the player takes when they defend
     */ 
	playerDefend: function(component, event, helper) {
        console.log("Inside playerDefend");
        component.set("v.playerAction", "defend");
        let customEvent = component.getEvent("customEvent");
        //This will generate the response for the next dragon action
        helper.generateDragonResponse(component);
        //Get what the damage was, is 0 if no attack. Both are set in helper method
        var dragAttack = component.get("v.doesDragonAttack");
        var dragDamage = parseInt(component.get("v.dragonDamage"));
        //Defending will reduce damage by half minus 1. 
        //Not calculated on non-attack because bugs.
        if(dragDamage > 0){
        	dragDamage = Math.floor(dragDamage / 2) - 1;
        }
        console.log("generated a response");
        customEvent.setParams({
            "playerDoesDamage" : false,
            "dragonDoesDamage" : dragAttack,
            "playerDamage" : dragDamage
        });
        helper.generateNextDragonAction(component);
        helper.generatePlayerResponse(1, component);
        customEvent.fire();
	},
    /*
     * This method will occur when the player fires off a fireball
     */ 
    playerFireball : function(component, event, helper) {
        console.log("Inside playerFireball");
        component.set("v.playerAction", "attack");
        let customEvent = component.getEvent("customEvent");
        var num = 20;
        //This will generate the response for the next dragon action
        helper.generateDragonResponse(component);
        //Get what the damage was, is 0 if no attack
        var dragAttack = component.get("v.doesDragonAttack");
        var dragDamage = parseInt(component.get("v.dragonDamage"));
        console.log("generated a response");
        customEvent.setParams({
            "playerDoesDamage" : true,
            "dragonDamage" : num,
            "dragonDoesDamage" : dragAttack,
            "playerDamage" : dragDamage
        });
        console.log(num);
        helper.generateNextDragonAction(component);
        helper.generatePlayerResponse(2, component);
        //Spells and items are meant for one time use, so the button
        //is disabled after one use.
        var btn = event.getSource();
        btn.set('v.disabled', true);
        customEvent.fire();
	},
     /*
     * This is the action the player takes when they press
     * the button to use the paralysis wand.
     */ 
    playerParalyze : function(component, event, helper) {
        console.log("Inside playerParalyze");
        component.set("v.playerAction", "paralyze");
        let customEvent = component.getEvent("customEvent");
        var dragonText = helper.generateDragonResponse(component);
        console.log("generated a response");
        customEvent.setParams({
            "playerDoesDamage" : false,
            "dragonDoesDamage" : false
        });
        //Spells and items are meant for one time use, so the button
        //is disabled after one use.
        var btn = event.getSource();
        btn.set('v.disabled', true);
        helper.generatePlayerResponse(3, component);
        helper.generateNextDragonAction(component);
        customEvent.fire();
	}
})