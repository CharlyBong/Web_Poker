//calcule le score de chaque joueur et determine ainsi le gagnant
function PokerTexasHoldEm(tabCartes){
	//tableau de cartes
	this.cards = tabCartes;
	//tableau de valeurs
	this.values = [];
	//tableau qui contient le nombre de cartes de meme hauteur
	this.num_values = [];
	//tableau qui contient les couleurs
	this.suits = [];
	//tableau qui contient le nombre de couleurs
	this.num_suits = [];
	//variable tmp qui va contenir les valeurs et couleurs des cartes
	var tmp = [];
	var i = 0;
	//va contenir les cartes de this.num_values
	this.num_values_key = [];
	//va contenir le nombre de fois qu'il y a les carte de this.num_values
	this.num_values_val = [];

	//parcours des cartes pour récupérer la value et la couleur
	//ici on utilise les objets Cards, passés en paramètre
	//on les traite et les stocke dans des tableaux 
	for(key in tabCartes){
		tmp[i] = [];
		tmp[i]['value'] = tabCartes[key].pth;
		tmp[i]['suit'] = tabCartes[key].suit;
		i++;
	}

	for(i = 0;i<tmp.length;i++){
		//tableau contenant toutes les valeurs
		this.values[i] = tmp[i]['value'];
		//tableau contenant toutes les valeurs
		this.suits[i] = tmp[i]['suit'];
	}
	//utilisée pour trier
	function compare(x,y){
		//pour ordre décroissant
		//si on veut trier par ordre croissant -> return x-y;
		return y-x;
	}
	//trier tableau values (de la plus grande à la plus petite)
	var temp = [];
	//tableau trié ordre décroissant
	this.values.sort(compare);
	this.num_values = arsort(array_count_values(this.values));
	
		

	PokerTexasHoldEm.prototype.fillnumvalue = function(){
		var ind = 0;
		var tmp = this.values[0];
		this.num_values_val = [0,0,0,0,0,0,0];
		this.num_values_key[0] = this.values[0];
		for(var i =0;i<this.values.length;i++){
			if(tmp != this.values[i]){
				tmp = this.values[i];
				ind++;
			}
			this.num_values_key[ind] = this.values[i];
			this.num_values_val[ind]++;
		}
	}

	this.fillnumvalue();
	
	//trie des couleurs
	this.suits.sort();
	//on compte les couleurs et on trie ensuite (Attention, ici c'est un objet)
	//la couleur ayant le plus de carte étant située en premier
	this.num_suits = arsort(array_count_values(this.suits));


	//renvoie la combinaison du joueur
	PokerTexasHoldEm.prototype.readable_hand = function(f_fhand){
		var arrCardsText = ['','','Deux', 'Trois', 'Quatres', 'Cinqs', 'Six', 'Septs', 'Huits', 'Neufs', 'Dix', 'Valets', 'Dames', 'Rois','As'];
		var arrCardsShort = ['','','2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'D', 'R', 'A'];
		var x = [];
		x = f_fhand.split('.');
		var szExtra;
		if(x[1]){
			szExtra = x[1];
		}
		else{
			szExtra = '';
		}
		var szHand = '';
		// console.log(parseInt('12')+5);
		switch(parseInt(x[0])){
			//quinte flush royale
			case 9:
				//penser à ajouter la couleur
				szHand = 'Quinte Flush Royale en '+szExtra.substr(0,1).toUpperCase()+szExtra.substr(1,szExtra.length).toLowerCase();
				break;
			//Quinte flush
			case 8:
				szHand = 'Quinte Flush en '+szExtra.substring(2).substr(0,1).toUpperCase()+szExtra.substring(2).substr(1,szExtra.length).toLowerCase() +' - Hauteur '+arrCardsText[parseInt(szExtra.substring(0,2))];
				break;
			//carré
			case 7:
				szHand = 'Carré - '+arrCardsText[parseInt(szExtra.substring(0,2))];
				break;

			//full
			case 6:
				szHand = 'Full aux '+arrCardsText[parseInt(szExtra.substring(0,2))]+' par les '+arrCardsText[parseInt(szExtra.substring(2,4))];
				break;
			//couleur
			case 5:
				szHand = 'Couleur '+szExtra.substring(10).substr(0,1).toUpperCase()+szExtra.substring(10).substr(1,szExtra.substring(10).length).toLowerCase()+' - Hauteur - '+arrCardsText[parseInt(szExtra.substring(0,2))];
				break;
			//suite
			case 4:
				szHand = 'Suite - Hauteur '+arrCardsText[parseInt(szExtra.substring(0,2))];
				break;
			//Brelan
			case 3:
				szHand = 'Brelan - '+arrCardsText[parseInt(szExtra.substring(0,2))];
				break;
			//Deux paires
			case 2:
				szHand = 'Deux paires - '+arrCardsText[parseInt(szExtra.substring(0,2))]+' et '+arrCardsText[parseInt(szExtra.substring(2,4))];
				break;
			//paire
			case 1:
				szHand = 'Une paire - '+arrCardsText[parseInt(szExtra.substring(0,2))];
				break;
			//carte haute
			case 0:
			default:
				arrKickers = [];
				arrKickers.push(arrCardsShort[parseInt(szExtra.substring(0,2))]);
				var c;
				c = parseInt(szExtra.substring(2,4));
				if(0 < c)
					arrKickers.push(arrCardsShort[c]);
				c = parseInt(szExtra.substring(4,6));
				if(0 < c)
					arrKickers.push(arrCardsShort[c]);
				c = parseInt(szExtra.substring(6,8));
				if(0 < c)
					arrKickers.push(arrCardsShort[c]);
				c = parseInt(szExtra.substring(8,10));
				if(0 < c)
					arrKickers.push(arrCardsShort[c]);
				szHand = 'Cartes Hautes - '+arrKickers.join(', ');
				break;
		}
		return szHand;
	}


	//quinte flush royale
	//ok
	PokerTexasHoldEm.prototype.royal_flush = function(){
		var straightFlush = this.straight_flush();
		if(straightFlush !== null && straightFlush.substring(0,2) === '14'){
			return straightFlush.substring(2);
		}
		return null;
	}

	//quinte flush
	//ok
	PokerTexasHoldEm.prototype.straight_flush = function(){
		//on teste d'abord si elles sont de la même couleur (on utilise flush qui le fait pour nous)
		var szSuit = this.flush(true);
		if(szSuit === null){
			return null;
		}
		var arrCard = [];
		for(value in this.values){
			if(szSuit == this.suits[value]){
				arrCard.push(this.values[value]);
			}
		}

		var szHiCard = this.straight(arrCard);
		if(szHiCard !== null){
			return szHiCard+szSuit;
		}
		return null;
	}

	//carré
	//ok
	PokerTexasHoldEm.prototype.four_of_a_kind = function(){
		var szExtra;
		for(value in this.num_values){
			if(this.num_values[value] >= 4){
				szExtra = this.padleft(value,2);
				for(v in this.values){
					if(this.values[v] != value){
						szExtra += this.padleft(this.values[v],2);
						return szExtra;
					}
				}
			}
		}
		return null;
	}

	//full (3 mêmes cartes + 2 autres mêmes cartes)
	//probleme a cause du tri du tableau this.num_values_key (pour l'ordre)
	//et chercher comment enlever une valeur d'un tableau pour trier les paires restantes
	PokerTexasHoldEm.prototype.full_house = function(){
		var values_key = this.num_values_key;
		var values_val = this.num_values_val;
		var szPair;
		var szThreeOfAKind;
		if((szThreeOfAKind = this.three_of_a_kind()) !== null){
			//A voir pour tester les deux cartes restantes
			// console.log("avant"+this.num_values_key);
			this.num_values_key.splice(0,1);
			this.num_values_val.splice(0,1);
			// console.log("apres"+this.num_values_key);
			szPair = this.one_pair();
			// console.log("onepair :"+this.one_pair());
			if(szPair !== null){
				console.log("full :"+szThreeOfAKind.substr(0,2)+szPair.substr(0,2));
				return szThreeOfAKind.substr(0,2)+szPair.substr(0,2);
			}
			this.fillnumvalue();
			return null;
		}
		return null;
	}

	//couleur
	//ok
	PokerTexasHoldEm.prototype.flush = function(f_bsimple){
		var bool = false;
		var szSuit;
		var szExtra;
		if(this.num_suits[Object.keys(this.num_suits)[0]] >=5){
			for(key in this.num_suits){
				if(bool == false){
					bool = true;
					szSuit = key;
				}
			}
			if(f_bsimple){
				return szSuit;
			}
			szExtra = '';
			for(i in this.values){
				if(szSuit == this.suits[i] && szExtra.length < 10){
					szExtra += this.padleft(this.values[i],2);
				}
				if(szExtra.length >=10){
					break;
				}
			}
			return szExtra+''+szSuit;
		}
		return null;
	}



	//suite
	//ok
	PokerTexasHoldEm.prototype.straight = function(f_arrValues){
		var arrValues = [];
		var iHiCard;
		var iPrevValue;
		var bOk;
		if(Array.isArray(f_arrValues)){
			for(i=0;i<f_arrValues.length;i++){
				arrValues[i] = f_arrValues[i];
			}
		}
		else{
			for(i=0;i<this.num_values_key.length;i++){
				arrValues[i] = this.num_values_key[i];
			}
		}
		//s'il y a moins de 5 cartes différentes, on sort
		if(arrValues.length < 5)
			return null;

		for(i=0;i<=arrValues.length-5;i++){
			iHiCard = iPrevValue = arrValues[i];
			bOk = true;
			for(j = i+1;j<i+5;j++){
				if(arrValues[j] != iPrevValue-1){
					bOk = false;
					break;
				}
				iPrevValue = arrValues[j];
			}
			if(bOk){
				return this.padleft(iHiCard,2);
			}
		}
		if(arrValues.indexOf(14) != -1 && arrValues.indexOf(2) != -1 && arrValues.indexOf(3) != -1 && arrValues.indexOf(4) != -1 && arrValues.indexOf(5) != -1){
			return '05';
		}
		return null;
	}


	//Brelan
	//ok
	PokerTexasHoldEm.prototype.three_of_a_kind = function(f_pv){
		var szExtra;
		for(key in this.num_values_val){
			if(this.num_values_val[key] >= 3){
				f_pv = this.num_values_key[key];
				szExtra = this.padleft(this.num_values_key[key],2);
				//ajout des deux plus hautes cartes restantes
				for(v in this.values){
					if(this.num_values_key[key] != this.values[v] && szExtra.length < 6){
						szExtra += this.padleft(this.values[v],2);
					}
					if(szExtra.length >= 6){
						break;
					}
				}
				return szExtra;
			}
		}
		return null;
	}


	//deux paires
	//ok
	PokerTexasHoldEm.prototype.two_pair = function(v1,v2){
		var szExtra = '';
		var iVal1 = 0;
		var iVal2 = 0;
		//parcours des cartes qui sont multiples
		for(key in this.num_values_val){
			if(this.num_values_val[key] >= 2 && szExtra.length < 4){
				szExtra += this.padleft(this.num_values_key[key],2);
				if(iVal1 == 0)
					iVal1 = this.num_values_key[key];
				else
					iVal2 = this.num_values_key[key];
			}
		}
		if(szExtra.length == 4){
			for(v in this.values){
				if(iVal1 != this.values[v] && iVal2 != this.values[v]){
					szExtra += this.padleft(this.values[v],2);
					break;
				}
			}
			return szExtra;
		}
		return null;
	}

	//une paire
	//ok
	PokerTexasHoldEm.prototype.one_pair = function(f_pv){
		var szExtra;
		for(value in this.num_values_val){
			if(this.num_values_val[value] >= 2){
				f_pv = this.num_values_key[value];
				szExtra = this.padleft(this.num_values_key[value],2);
				for(v in this.values){
					if(this.num_values_key[value] != this.values[v] && szExtra.length < 8){
						szExtra +=this.padleft(this.values[v],2);
					}
					if(szExtra.length >= 8){
						break;
					}
				}
				return szExtra;
			}
		}
		return null;
	}




	//va calculer le score total du joueur
	PokerTexasHoldEm.prototype.score = function(){
		var iScore = 0;
		var szExtra;
		if(this.royal_flush() !== null){
			szExtra = this.royal_flush();
			iScore = 9;
		}
		else if(this.straight_flush() !== null){
			szExtra = this.straight_flush();
			iScore = 8;
		}
		else if(this.four_of_a_kind() !== null){
			szExtra = this.four_of_a_kind();
			iScore = 7;
		}
		else if(this.full_house() !== null){
			szExtra = this.full_house();

			iScore = 6;
		}
		else if(this.flush() !== null){
			szExtra = this.flush();
			iScore = 5;
		}
		else if(szExtra = this.straight() !== null){
			szExtra = this.straight();
			iScore = 4;
		}
		else if(this.three_of_a_kind() !== null){
			szExtra = this.three_of_a_kind();
			iScore = 3;
		}
		else if(this.two_pair() !== null){
			szExtra = this.two_pair();
			iScore = 2;
		}
		else if(szExtra = this.one_pair() !== null){
			szExtra = this.one_pair();
			iScore = 1;
		}

		if(iScore < 1){
			iScore = 0;
			szExtra = '';
			for(v in this.values){
				if(szExtra.length < 10){
					szExtra += this.padleft(this.values[v],2);
				}
				if(szExtra.length >= 10){
					break;
				}
			}
		}
		return iScore+'.'+szExtra.toString();
	}



	//utilisé pour remplir la chaine de caractère qu'on renvoi
	PokerTexasHoldEm.prototype.padleft = function(n, width, z) {
 		 z = z || '0';
  		n = n + '';
  		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}
	//methode permettant de flipper ligne et colonne d'un tableau
	PokerTexasHoldEm.prototype.flip2dArray = function(a){
		var r = [];
		var k=0,l=0;
		for(var i = 0;i<a.length;i++){
			r[k] = new Array(a[i].length);
			for(var j=0;j<a[i].length;j++){
				r[k][l] = a[j][i];
				l++;
			}
			k++;
		}
		return r;
	}
}