//global variables
var hp1 = $('#p1hp').width();
var hp2 = $('#p2hp').width();
var hpMax = 360;
//health in percentage (easier to deal with?)
//var life1 = 100*(hp1/hpMax);
//var life2 = 100*(hp2/hpMax);
//deck and card variables
var card = 'card';//temporary stand-in with for card object
var master_deck = [];
var p1deck = [card, card];
	var p1attacking = [];
	var p1defending = [];
var p2deck = [card, card];
	var p2attacking = [];
	var p2defending = [];
var shield = 72;

//Trying out game in OOP

//Player and Card objects
//Player object
function Player(name)
{
	this.name = name;
	this.hp = 100;//if I'm not using this delete
	this.deck = [];
}

//Card objects and resulting children; only one for now
function Card()
{
	this.name = "basic";
	this.base_dmg = 10;
}

Player.prototype.attack = function()
{
	var dmg_calc;//needs to be 10% of 360 (36) --> the 10% is equivalent to "10" damage inflicted
	var dmg = 0;
	var converter;
	if (this.deck.length > 0)
	{
		for (card in this.deck)
		{
			dmg_calc = this.deck[card].base_dmg;
			dmg += dmg_calc;
			converter = (dmg/100)*360;
		}
	}
	else
	{
		converter = 0;
	}
	return converter;
}

Player.prototype.defend = function()//these will be used if I decide to implement blocking w/ cards
{
	return;
}

Player.prototype.focus = function()//these will be used if I decide to implement blocking w/ cards
{
	return;
}







//game initialization happens here
$(document).ready(function()
{
 	$("#ng").on('click', function()
	{
		//testing
		
		/* var p1 = new Player("Cyrus");
		console.log(p1.name);
		console.log(p1.hp);
		console.log(p1.hp - p1.attack());
		console.log(healthP1 - p1.attack()); */
		
		//end test
	
		window.alert("GET READY TO FIGHT NERD")
		//single-player or multi-player?
		var player_input = window.prompt("How many players? (Enter 1 or 2)");
		if (player_input == 1)
		{
			mainGameSP();
		}
		else if (player_input == 2)
		{
			window.alert("Wait for MP implementation; redirecting to single player");
			mainGameSP();
		}
		else
		{
			window.alert("Invalid selection; enter valid option");
			return;
		}
		//prepare game deck for later; room for card modifications
		
		/* for (var deck_limit = 0; deck_limit <= 30; deck_limit++)
		{
			master_deck.push(card);
		}
		console.log(master_deck); */
	}); 
});



//main game function for SINGLE PLAYER; while both players still have health, game will continue
function mainGameSP()
{
	//instantiates players
	var p1 = new Player('Cyrus');
	var p2 = new Player('Computer');
	var p1move;
	var compMove;
	$('#p1name').html(p1.name + "'s Health");
	$('#p2name').html(p2.name + "'s Health");
	
	//set up health + health variables
	$('#p1hp').width("100%");
	$('#p2hp').width("100%");
	
	//instantiates deck
	for (var cardcount = 0; cardcount < 2; cardcount++)
	{
		p1.deck.push(new Card());
		p2.deck.push(new Card());
	}
	
	//set up deck visibility
	$('#p1deck_area').html("Deck: " + p1.deck.length);
	$('#p2deck_area').html("Deck: " + p2.deck.length);
	
	//player 1's options
	//player1 attack
	$('#attack').click(function()
	{
		p1move = this.id;
		//generating randomized moveset for computer
		var compTurn = Math.random();
		
		//computer attacking
		if (compTurn <= 0.33)
			{
				compMove = "attack";
			}
			
		//computer defending
		else if (compTurn <= 0.66 && compTurn > 0.33)
			{
				compMove = "defend";
			}
			
		//computer focusing
		else
			{
				compMove = "focus";
			}
		console.log(compMove);
		
		//conditions for attack, defence and focus
		if (p1move == "attack" && compMove == "attack")
		{
			var dmg1 = p1.attack();
			var dmg2 = p2.attack();
			console.log(dmg1);
			console.log(dmg2);
			hp1 = hp1 - dmg2;
			console.log(hp1);
			hp2 = hp2 - dmg1;
			console.log(hp2);
			console.log(p2.deck.length);
			$('#p1hp').width(hp1);
			$('#p2hp').width(hp2);
			p1.deck = [];
			p2.deck = [];
			$('#p1deck_area').html("Deck: " + p1.deck.length);
			$('#p2deck_area').html("Deck: " + p2.deck.length);
		}
		
		//defending
		else if (p1move == "attack" && compMove == "defend")
		{
			var dmg1 = p1.attack();
			hp2 = (hp2 - dmg1) + shield;
			$('#p2hp').width(hp2);
			p1.deck = [];
			$('#p1deck_area').html("Deck: " + p1.deck.length);
			$('#p2deck_area').html("Deck: " + p2.deck.length);
		}
		
		//focusing
		else if (p1move == "attack" && compMove == "focus")
		{
			var dmg1 = p1.attack();
			hp2 = hp2 - dmg1;
			$('#p2hp').width(hp2);
			p1.deck = [];
			p2.deck.push(new Card());
			$('#p1deck_area').html("Deck: " + p1.deck.length);
			$('#p2deck_area').html("Deck: " + p2.deck.length);
			console.log(p2.deck);
		}
	});
		
	//player1 defence
	$('#defend').click(function()
	{
		p1move = this.id;
	});
	
	$('#focus').click(function()
	{
		p1move = this.id;
	});
	//conditions for attack, defence and focus
	if (p1move == "attack" && compMove == "attack")
	{
		
	}
	else if (p1move == "attack" && compMove == "defend")
	{
		
	}

	//win conditions with deck reset implemented
	if (hp1 > 0 && hp2 <= 0)
	{
		window.alert("U WON!!!!!!");
		return;
	}
	else if (hp1 <= 0 && hp2 > 0)
	{
		window.alert("the computer beat you STOP SUCKING SO BAD");
		return;
	}
	else if (hp1 <= 0 && hp2 <= 0)
	{
		window.alert("Draw! Which means computer wins by default. So you lost. Loser.");
		return;
	}
}
