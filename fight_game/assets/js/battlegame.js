//global variables
var hp1 = $('#p1hp').width();
var hp2 = $('#p2hp').width();
var hpMax = 360;
//health in percentage (easier to deal with?)
var healthP1 = 100*(hp1/hpMax);
var healthP2 = 100*(hp2/hpMax);
//deck and card variables
var card = 'card';//temporary stand-in with for card object
var master_deck = [];
var p1deck = [card];
	var p1attacking = [];
	var p1defending = [];
var p2deck = [card];
	var p2attacking = [];
	var p2defending = [];
//standard damage & defense
var p1dmg = p1attacking.length*(36);//needs to be 10% of 360 (36) --> the 10% is equivalent to "10" damage inflicted
var p1shield = p1defending.length*(36);
var p2dmg = p2attacking.length*(36);//have to account for different cards later on
var p2shield = p2defending.length*(36);
console.log(healthP1);




//game initialization happens here
$(document).ready(function()
{
	$("#ng").on('click', function()
	{
		window.alert("GET READY TO FIGHT NERD")
		//single-player or multi-player?
		var player_input = window.prompt("How many players? (Enter 1 or 2)");
		$('#p1hp').width("100%");
		$('#p2hp').width("100%");
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
		//prepare game deck; room for card modifications
		for (var deck_limit = 0; deck_limit <= 30; deck_limit++)
		{
			master_deck.push(card);
		}
		console.log(master_deck);
		//set up deck visibility
		$('#p1deck_area').append("Deck: " + p1deck.length);
		$('#p2deck_area').append("Deck: " + p2deck.length);
	});
});



//main game function for SINGLE PLAYER; while both players still have health, game will continue
function mainGameSP()
{
	var compMove;
	var compAttack;
	var p1move;
	
	//player 1's options
	//player1 attack
	$('#attack').click(function()
	{
		p1move = this.id;
		//generating randomized moveset for computer
		compTurn = Math.random();
		//attacking
		if (compTurn <= 0.33)
			{
				compMove = "attack";
				compAttack = ((Math.random() * 4));//I think that 4 limits the max attack to 4 cards
				for (var dudes = 0; dudes <= compAttack; dudes++)
				{
					p2deck.splice(1, 1);
					if (p2deck.length != 0)
					{
						console.log(p2deck);
						console.log(p2deck.length);
						p2attacking.push(card);
						console.log(p2deck.length);
						console.log(p2attacking);
					}
				}
			}
		//defending
		else if (compTurn <= 0.66 && compTurn > 0.33)
			{
				compMove = "defend";
				compDefence = ((Math.random() * 2) + 1);//2 should limit defence to 2 cards
				for (var dudes = 0; dudes <= compAttack; dudes++)
				{
					p2deck.splice(0, 1);
					if (p2deck.length != 0)
					{
						p2defending.push(card);
					}
				}
			}
		//focusing
		else
			{
				compMove = "focus";
				p2deck.push(card);
			}
		console.log(compMove);
		//conditions for attack, defence and focus
		if (p1move == "attack" && compMove == "attack")
		{
			var attackers = window.prompt("How many cards are you attacking with? If you pick a number that exceeds your current deck, you will commit your entire current deck to attack.");
			for (var dudes = 0; dudes <= attackers; dudes++)
			{
				p1deck.splice(1, 1);
				if (p1deck.length != 0)
				{
					p1attacking.push(card);
				}
			}
			console.log(p1attacking);
			console.log(p1dmg);
			
			p1attacking = [];
			p1defending = [];
			p2attacking = [];
			p2defending = [];
		}
		//defending
		else if (p1move == "attack" && compMove == "defend")
		{
			
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
	console.log(p1move);
	//generating randomized moveset for computer
	compTurn = Math.random();
	if (compTurn <= 0.33)
		{compMove = "attack";}
	else if (compTurn <= 0.66 && compTurn > 0.33)
		{compMove = "defend";}
	else
		{compMove = "focus";}
	console.log(compTurn);
	console.log(compMove);
	
	//conditions for attack, defence and focus
	if (p1move == "attack" && compMove == "attack")
	{
		var attackers = window.prompt("How many cards are you attacking with?");
		
		console.log(p1dmg);
		$('#p1hp').css('width', (360 - p2dmg));
		$('#p2hp').css('width', (360 - p1dmg));
	}
	else if (p1move == "attack" && compMove == "defend")
	{
		
	}

	//win conditions with deck reset implemented
	if (healthP1 > 0 && healthP2 <= 0)
	{
		window.alert("U WON!!!!!!");
		master_deck = [];
		p1deck = [card];
		p2deck = [card];
		return;
	}
	else if (healthP1 <= 0 && healthP2 > 0)
	{
		window.alert("the computer beat you STOP SUCKING SO BAD");
		master_deck = [];
		p1deck = [card];
		p2deck = [card];
		return;
	}
	else if (healthP1 <= 0 && healthP2 <= 0)
	{
		window.alert("Draw! Which means computer wins by default. So you lost. Loser.");
		master_deck = [];
		p1deck = [card];
		p2deck = [card];
		return;
	}
}
