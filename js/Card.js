function Card(f_iCard){
	//index de la carte concernée (de 0 à 51)
	this.indexCard = Math.floor(f_iCard%52);
	//index de la suit (Trefle, Coeur, Carreau, Pique)
	this.indexSuit = Math.floor(this.indexCard/13);
	//index pour selectionner le nom de la carte (deux -> as)
	this.indexName = this.indexCard%13;
	//tableau des types de cartes
	var arraySuits = ['trefle', 'carreau', 'coeur', 'pique'];
	//listes des cartes en mode lettre (si probleme de calcul de proba, peut etre du au changement de place, j'ai mis l'as en dernier alors qu'il etait en premier)
	var arrayNames = ['deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'valet', 'dame', 'roi', 'as'];
	//liste des cartes en mode chiffre
	var arrayShort = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'v', 'd', 'r', 'a'];

	//tableau en anglais
	var arraySuitsUK = ['clubs', 'diamonds', 'hearts', 'spades'];
	//tableau en anglais des valeurs pour se simplifier la tache
	var arrayShortUK = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
	//valeur de chaque cartes
	var arrayValues = [2,3,4,5,6,7,8,9,10,10,10,10,11];

	//valeur des cartes en fonction de leur ordre
	var arrayPTHValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

	//A voir si la variable suivante est utile ou non
	this.indexC = this.indexCard;
	this.suit = arraySuits[this.indexSuit];
	this.nom = arrayNames[this.indexName];
	this.valeur = arrayValues[this.indexName];
	this.shortValue = arrayShort[this.indexName];
	this.pth = arrayPTHValues[this.indexName];

	this.shortValueUK = arrayShortUK[this.indexName];
	this.suitUK = arraySuitsUK[this.indexSuit];

	//variable de la classe qui permet de dire si la carte est active (utilisée dans la main d'un joueur ou au centre, ou non active)
	this.isActive = false;

	//creation d'un identifiant pour recupérer plus facilement la carte
	this.identifier = this.suitUK+"_"+this.shortValueUK;

	//fonction qui permet de créer la balise image en fonction des caractéristiques de la carte
	this.toString = function(){
		return '<img title="'+this.indexC+' '+this.fullname()+'" id="'+this.identifier+'" src="images/'+this.suitUK+'_'+this.shortValueUK+'.gif" class="cartes"/>';
	}

	//fonction qui renvoi un truc du genre : as de pique
	this.fullname = function(){
		return this.nom+' de '+this.suit;
	}

	this.random = function(){
		//cree un nouvelle carte aléatoire
		return new Card(Math.floor(Math.random()*52));
	}
}


//Objet Deck, stocke 52 cartes différentes
function Deck(){
	//indice de la carte suivante
	this.indexNextCard = 0;
	//tableau qui va contenir notre deck de cartes
	this.cards = [];
	//génére les 52 cartes et les affiche sur le "plateau"
	for(iCard in Array.apply(null,Array(52)).map(function(_,i){return i;})){
		var card = new Card(iCard);
		this.cards.push(card);
		$("#imgContainer").append(card.toString());
	}

	//renvoie la valeur de la carte suivante
	this.nextCard = function(){
		//si le tableau est vide : on ne fait rien, sinon on renvoie la valeur suivante
		if(typeof this.cards[this.indexNextCard] != 'undefined'){
			return this.cards[this.indexNextCard++];
		}
		return null;
	}

	//renvoie le nombre de cartes qu'il reste en fonction de l'indice où on se trouve
	this.sizeLeft = function(){
		return this.cards.length - this.indexNextCard;
	}

	//fusionne deux decks
	this.add_deck = function(objDeck){
		this.cards = this.cards.concat(objDeck.cards);
	}

	//ajouter une carte dans notre tableau
	this.addCard = function(objCard){
		this.cards.push(objCard);
	}

	//melanger le paquet de cartes
	this.shuffleCards = function(){
		taille = this.cards.length;
		for(i = 0;i<taille;i++){
			j = Math.floor(Math.random()*(taille - i) + i);
			temp = this.cards[i];
			this.cards[i] = this.cards[j];
			this.cards[j] = temp;
		}
	}

	//réinitialise l'indice des cartes et mélange le paquet
	this.replenish = function(){
		this.indexNextCard = 0;
		this.shuffleCards();
	}

	this.activeCard = function(id){
		for(carte in this.cards){
			if(carte.identifier == id && carte.isActive == false)
				carte.isActive = true;
		}
	}

	this.desactiveCard = function(id){
		for(carte in this.cards){
			if(carte.identifier == id && carte.isActive == true)
				carte.isActive = false;
		}
	}

	//Retourne un nombre aléatoire compris entre min et max
	this.getRandom = function(min,max){
		return Math.floor(Math.random() * (max - min) + min);
	}

	//renvoie une carte aléatoire, qui n'est pas deja possédée par un joueur
	this.getRandomCard = function(){
		var card = this.cards[this.getRandom(0, 51)];
		while(card.isActive != false){
			card = this.cards[this.getRandom(0, 51)];
		}
		card.isActive = true;
		return card;
	}


	this.getCardById = function(id){
		for(i in this.cards){
			if(this.cards[i].identifier == id)
				return this.cards[i];
		}
	}

}

