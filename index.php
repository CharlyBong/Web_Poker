<?php
// require "liste.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Projet de Poker</title>
		
		<link rel='stylesheet' href='css/index.css'/>
	</head>
	<!--<body onload="afficheCarte();dragndrop();">-->
	<body onload="afficheMiddleCards();dragndrop();">
		<img src='images/table.png' alt='tablePoker' id='table'>

		<div id='p1'>
			<img src='images/back_j1.png' alt='J1-false' id='pj1' onclick="activateplayer(1);">
		</div>
		<div id='p2'>
			<img src='images/back_j2.png' alt='J2-false' id='pj2' onclick="activateplayer(2);">
		</div>
		<div id='p3'>
			<img src='images/back_j3.png' alt='J3-false' id='pj3' onclick="activateplayer(3);">
		</div>
		<div id='p4'>
			<img src='images/back_j4.png' alt='J4-false' id='pj4' onclick="activateplayer(4);">
		</div>
		<div id='p5'>
			<img src='images/back_j5.png' alt='J5-false' id='pj5' onclick="activateplayer(5);">
		</div>
		<div id='p6'>
			<img src='images/back_j6.png' alt='J6-false' id='pj6' onclick="activateplayer(6);">
		</div>

		<div id="imgContainer">	</div>

		<div id="piocheContainer">
			<input type="button" value="Pioche" onclick="cardsFlop();">
			<div id="flopContainer" style="height:110px;">	</div>
			<input type="button" value="reload" onclick="window.location.reload();">
			<input type="button" value="calcul" onclick="setScoreForPlayers();">
			<input type="button" value="calcul" onclick="resetMain();">
		</div>
		<div id="result">
			<div id="r1" class="rplayer win">
				<img src='images/back_j1.png' class="cartavatar">
				<div class="rcartes" id="cr1">
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
				</div>
				<br/>
				<p id="tr1" class="txtres"></p>
			</div>

			<div id="r2" class="rplayer">
				<img src='images/back_j2.png' class="cartavatar">
				<div class="rcartes" id="cr2">
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
				</div><br/>
				<p id="tr2" class="txtres"></p>
			</div>

			<div id="r3" class="rplayer">
				<img src='images/back_j3.png' class="cartavatar">
				<div class="rcartes" id="cr3">
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
				</div><br/>
				<p id="tr3" class="txtres"></p>
			</div>

			<div id="r4" class="rplayer">
				<img src='images/back_j4.png' class="cartavatar">
				<div class="rcartes" id="cr4">
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
				</div><br/>
				<p id="tr4" class="txtres"></p>
			</div>

			<div id="r5" class="rplayer">
				<img src='images/back_j5.png' class="cartavatar">
				<div class="rcartes" id="cr5">
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
				</div><br/>
				<p id="tr5" class="txtres"></p>
			</div>

			<div id="r6" class="rplayer">
				<img src='images/back_j6.png' class="cartavatar">
				<div class="rcartes" id="cr6">
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
					<img src="images/back_deck.png" class="smallcartes"/>
				</div><br/>
				<p id="tr6" class="txtres"></p>
			</div>
		</div>

		<!-- <input type="button" value="Pioche Joueur 1" onclick="cardsJ1();">
		<div id="j1container" style="height:110px;"></div>
		<input type="button" value="reload" onclick="window.location.reload();"> -->	

		<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui.js"></script>

		<script type="text/javascript" src="js/jquery-css-transform.js"></script>
		<script type="text/javascript" src="js/rotate3Di.js"></script>
		<script type="text/javascript" src="js/afficheImages.js"></script>
		<script type="text/javascript" src="js/PokerTexasHoldEm.js"></script>
		<script type="text/javascript" src="js/Card.js"></script>
		<script type="text/javascript" src="js/arsort.js"></script>
		<script type="text/javascript" src="js/array_count_values.js"></script>
	</body>
</html>