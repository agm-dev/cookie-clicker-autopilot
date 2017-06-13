function clickForTheWin(){
	Game.ClickCookie();
    Game.shimmers.map(s => { s.pop() })
	Game.CollectWrinklers();
}

function lookingForTheBestChoice(){
	theBestChoice = 0;
	cpsPerCookie = 0;
	for ( var i = 0; i < Game.ObjectsById.length; i++ ){
		if ( i == 0 ) {
			var cpsPerCookieTemp = Game.ObjectsById[i].storedCps / Game.ObjectsById[i].price; //Calculates the cps per cookie spent on it.
			if ( cpsPerCookieTemp >= cpsPerCookie ){
				cpsPerCookie = cpsPerCookieTemp;
				theBestChoice = i;
			}
		} else if ( Game.ObjectsById[i-1].amount >= 1) {
			var cpsPerCookieTemp = Game.ObjectsById[i].storedCps / Game.ObjectsById[i].price;
			if ( cpsPerCookieTemp >= cpsPerCookie ){
				cpsPerCookie = cpsPerCookieTemp;
				theBestChoice = i;
			}
		} else {
			break;
		}

	}
}

function smartAutoPilot(){
	if ( Game.cookies >= Game.ObjectsById[theBestChoice].price ){
		Game.ObjectsById[theBestChoice].buy();
		lookingForTheBestChoice();
	} else if ( Game.ObjectsById[Game.ObjectsById.length - 1].amount >= lastBuildingAmountToStartBuyingUpgrades ||
				Game.cookiesPs >= Game.UpgradesInStore[0].getPrice() ) {
		//Buying upgrades
		for ( var i = 0; i < Game.UpgradesInStore.length; i++ ){
			if (	Game.cookies > Game.UpgradesInStore[i].getPrice() &&
					Game.UpgradesInStore[i].name != Game.Upgrades["Elder Pledge"].name &&
					Game.UpgradesInStore[i].name != Game.Upgrades["Elder Covenant"].name ) {
				Game.UpgradesInStore[i].buy();
				break;
			}
		}
	}
}

function clearAllIntervals(){
	for (var i = 0; i < timers.length; i++ ){
		clearInterval(timers[i]);
	}
	timers = [];
}

//Main
var timers = [];
var lastBuildingAmountToStartBuyingUpgrades = 40; //Auto explained.
var theBestChoice = 0;
var cpsPerCookie = 0;
lookingForTheBestChoice();
var timer1 = setInterval(clickForTheWin, 100);
timers.push(timer1);
//var timer2 = setInterval(autoPilot, 1000);
var timer3 = setInterval(Game.CollectWrinklers, 300000);
timers.push(timer3);
var timer4 = setInterval(smartAutoPilot, 1000);
timers.push(timer4);
