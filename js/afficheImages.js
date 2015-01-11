function cardsFlop(){
	if(cpt == 0){
		//Boucle pour les 3 premieres cartes du flop
		for(i=1;i<4;i++){
			var ic = $("#back"+i+"container").attr("ic");
 
        	$("#"+ic).attr('src','images/'+ic+'.gif').rotate3Di('+=180', 150);
        	$("#"+ic).attr('alt',ic);

			var rand = deck.getRandomCard();
			$("#"+rand.identifier).attr('src','images/back_deck.png').rotate3Di('+=180', 300);
			// 	$("#"+listCards[index-cpt]).rotate3Di('+=180', 300),
			// setTimeout(enleveCarteFlop(index,cpt), 300);

			$("#back"+i+"container").rotate3Di('+=180', 300),
			setTimeout(retourneCarteFlop(i,rand.identifier), 150);		
			cpt++;
		}
	}
	else{
		//Ici passage pour les deux dernieres cartes du flop
		if(cpt >= 3 && cpt < 5 ){
			var ic = $("#back"+i+"container").attr("ic");
 
        	$("#"+ic).attr('src','images/'+ic+'.gif').rotate3Di('+=180', 150);
        	$("#"+ic).attr('alt',ic);

			//On enleve la carte en question du milieu
			var rand = deck.getRandomCard();
			$("#"+rand.identifier).attr('src','images/back_deck.png').rotate3Di('+=180', 300);
			//setTimeout(enleveCarteFlop(index,cpt), 300);								
			//on l'a met sur le flop
			$("#back"+i+"container").rotate3Di('+=180', 300),
			setTimeout(retourneCarteFlop(i,rand.identifier),150);
			i++;
			cpt++;
		}
	}
	if(cpt >= 5) cpt = 0;
}


//closure pour permettre la rotation et le changement de cartes (utilisé pour les cartes du flop)
function retourneCarteFlop(i,identifier){
	var retour = function() {
		$("#back"+i+"container").attr('src','images/'+identifier+'.gif').rotate3Di('+=180', 150);
		$("#back"+i+"container").attr('ic',identifier);
	}
	return retour;
}


//Permet si on clique sur une carte de la mettre dans la main
function clickJ1(id){
	$("#back1j1").attr('src','images/'+id+'.gif').rotate3Di('+=180', 150);
	$("#"+id).remove();
}

// fonction qui retire une carte du deck
function enleve(id){
    $("#"+id).attr('src','images/back_deck.png').rotate3Di('+=180', 150);
    $("#"+id).attr('alt','back_deck');
    for(carte in deck.cards){
    	if(deck.cards[carte].identifier == id && deck.cards[carte].isActive == false){
    		deck.cards[carte].isActive = true;
    	}
    }
    //fonction qui enleve la carte du gros paquet
    //enleveTab(id);
    //console.log(index + ' - ' + cpt);
}

// fonction qui ajoute une carte sur l'emplacement (retour l'ancienne carte au besoin)
function ajouter(conteneur,id){
    var ic = $(conteneur).attr('ic');

    if(ic != 'back_deck'){
    	//si on clique là où le joueur avait deja une carte
    	//on remet cette carte dans le paquet
        $("#"+ic).attr('src','images/'+ic+'.gif').rotate3Di('+=180', 150);
        $("#"+ic).attr('alt',ic);
        for(carte in deck.cards){
        	if(deck.cards[carte].identifier == ic && deck.cards[carte].isActive == true){
        		deck.cards[carte].isActive = false;
        	}    		
        }
        //rajoutTab(ic);
    }

    var img = $("#"+id).attr('src');
    $(conteneur).attr('src',img).rotate3Di('+=180', 150);
    $(conteneur).attr('ic',id).rotate3Di('+=180', 150);
    
}


//Note : pour le dos de carte (support joueur) choisir en un fond identique à tous ou le leur personnel transparent
function activateplayer(id){
        var cplayer = 'pj'+id;
        if($("#"+cplayer).attr("alt") == 'J'+id+'-false'){ // Activation Joueur
                //$("#"+cplayer).attr('src','images/back_j.png').rotate3Di('+=180', 150);
                $("#"+cplayer).attr('src','images/back_j'+id+'.png').attr('class','opac').rotate3Di('+=180', 150);
 
                $("#"+cplayer).attr('alt','J'+id+'-true');
 
                $("#p"+id).append("<img src='images/back_deck.png' class='cartJ' alt='c1-"+id+"' id='p"+id+"-c1' ic='back_deck' onclick='onclickcarteJ(this)'>")
                $("#p"+id).append("<img src='images/back_deck.png' class='cartJ' alt='c2-"+id+"' id='p"+id+"-c2' ic='back_deck' onclick='onclickcarteJ(this)'>");
 
                console.log("Joueur "+id+" actif");
        }
        else{ // Déactivation Joueur
                $("#"+cplayer).attr('src','images/back_j'+id+'.png').rotate3Di('+=180', 150);
                $("#"+cplayer).attr('class','');
 
                $("#"+cplayer).attr('alt','J'+id+'-false');
 
                var ic1 = $("#p"+id+"-c1").attr("ic");
                var ic2 = $("#p"+id+"-c2").attr("ic");
 
                $("#"+ic1).attr('src','images/'+ic1+'.gif').rotate3Di('+=180', 150);
        		$("#"+ic1).attr('alt',ic1);
 	
        		$("#"+ic2).attr('src','images/'+ic2+'.gif').rotate3Di('+=180', 150);
        		$("#"+ic2).attr('alt',ic2);
 
                for(carte in deck.cards){
                if(deck.cards[carte].identifier == ic1 && deck.cards[carte].isActive == true)
                        deck.cards[carte].isActive = false;
                if(deck.cards[carte].identifier == ic2 && deck.cards[carte].isActive == true)
                        deck.cards[carte].isActive = false;
        }
 
 
                $("#p"+id+"-c1").remove();
                $("#p"+id+"-c2").remove();
 
 
                console.log("Joueur "+id+" déactivé");
        }
 
        $(".cartJ").droppable({
                drop:function(event, ui){
                        var value = ui.draggable.find(".cartes").context.id;
                        var alt = ui.draggable.find(".cartes").context.alt;
                        if(alt != 'back_deck' ){
                                ajouter(this,value);
                                enleve(value);
                                console.log(ui.draggable.find(".cartes").context.id);
                        }else console.info("back deck move !");
 
                        // TO DO : prise en compte de l'attribution des cartes
         }});
       
}

function dragndrop(){
	$(".cartes").draggable({cursor:"move",helper:"clone",opacity:0.7,revert:true,snap:".cardsFlop, .cartJ",snapMode:"inner"});
	$(".cardsFlop").droppable({
		drop:function(event, ui){
			console.log($(this).context.id);
			var value = ui.draggable.find(".cartes").context.id;
			var alt = ui.draggable.find(".cartes").context.alt;
			if(alt != 'back_deck' ){
				if(verifflop($(this).context.id)){
					ajouter(this,value);
					enleve(value);
					console.log(ui.draggable.find(".cartes").context.id);
				}else console.info("Flop dans l'ordre !");
			}else console.info("back deck move !");

			// TO DO : prise en compte de l'attribution des cartes
	 }});
}

function verifflop(id){
	var f1 = $('#back1container').attr("ic");
	var f2 = $('#back2container').attr("ic");
	var f3 = $('#back3container').attr("ic");
	var f4 = $('#back4container').attr("ic");

	if(("back1container" != id) && (f1 == "")) return false;
	if("back1container" == id) return true;
	if(("back2container" != id) && (f2 == "")) return false;
	if("back2container" == id) return true;
	if(("back3container" != id) && (f3 == "")) return false;
	if("back3container" == id) return true;
	if(("back4container" != id) && (f4 == "")) return false;
	
	return true;
}

function onclickcarteJ(ths){
	
	var card = deck.getRandomCard();
	var value = card.identifier;
	//ajoute la carte sur l'emplacement du joueur
	ajouter(ths,value);
	//enleve la carte du paquet
	enleve(value);
}

//affiche le dos des cartes du flop, au lancement de la page
function afficheMiddleCards(){
	cpt = 0;
	$("#flopContainer").append("<img src='images/back_deck.png' alt='' id='back1container' class='cardsFlop'>").append("<img src='images/back_deck.png' alt='' id='back2container' class='cardsFlop'>").append("<img src='images/back_deck.png' alt='' id='back3container' class='cardsFlop'>").append("<img src='images/back_deck.png' alt='' id='back4container' class='cardsFlop'>").append("<img src='images/back_deck.png' alt='' id='back5container' class='cardsFlop'>");
	$('.cardsFlop').attr('ic','back_deck');
	deck = new Deck();
	var tab = [deck.cards[25],deck.cards[38],deck.cards[7],deck.cards[20],deck.cards[10],deck.cards[11]];
	var tab2 = deck.cards[12];
	var tab3 = tab.concat(tab2);
	// var poker = new PokerTexasHoldEm(tab3);
	// console.log(poker.readable_hand(poker.score()));
	// console.log(poker.readable_hand("8.11pique"));
	// poker.straightFlush();
}

function verif(){
        var cptj = 0; 
        for (var i = 1; i < 7; i++) {
        		//si un joueur est actif
                if($("#pj"+i).attr("alt") == ("J"+i+"-true")){
                		//cartes du joueur
                        if( $("#p"+i+"-c1").attr("ic") == 'back_deck' ) return false;
                        if( $("#p"+i+"-c2").attr("ic") == 'back_deck' ) return false;
                        cptj++;
                }
        };
 
        if (cptj == 0) return false;
 
        for (var i = 1; i < 6; i++) {
                if( $("#back"+i+"container").attr("ic") == 'back_deck' ) return false;
        };
 
        return true;
}

//va remplir un tableau qui contiendra les cartes du joueur i
function calculScoreJoueur(i){
	//on vérifie, si c'est pas bon, on quitte
	if(!verif()){
		alert("Il manque des cartes !");
		return;
	}
		
	var arrayplayer = [];

	if($("#pj"+i).attr("alt") == ("J"+i+"-true")){
		arrayplayer.push(deck.getCardById($("#p"+i+"-c1").attr("ic")));
		arrayplayer.push(deck.getCardById($("#p"+i+"-c2").attr("ic")));
	}
	 for (var index = 1; index < 6; index++) {
		arrayplayer.push(deck.getCardById($("#back"+index+"container").attr("ic")));
	}
	var poker = new PokerTexasHoldEm(arrayplayer);
	$("#tr"+i).text(poker.readable_hand(poker.score()));
	return poker.score();
}

//retourne les joueurs actifs
function getActivePlayers(){
	var activep = [];
	for(var i =1;i<7;i++){
		if($("#pj"+i).attr("alt") == ("J"+i+"-true")){
			activep.push(i);
		}
	}
	return activep;
}

//affiche les scores des joueurs, et met en évidence le gagnant
function setScoreForPlayers(){
	resetWinner();
	var activeplayer = getActivePlayers();
	var score = [];
	for(var i=0;i<activeplayer.length;i++){
		score[activeplayer[i]] = parseFloat(calculScoreJoueur(activeplayer[i]).substring(0,10));
	}
	console.log(score);
	var bool = false;
	var max;
	var jgagnantbis = [];
	for(var i = 1;i<7;i++){
		if(score[i] && bool == false){
			max = score[i];
			jgagnantbis.push(i);
			bool = true;
		}
		else if(score[i] && score[i] == max){
			max = score[i];
			jgagnantbis.push(i);
		}	
		else if(score[i] && score[i] > max){
			max = score[i];
			jgagnantbis = [];
			jgagnantbis.push(i);
		}
	}
	for(key in jgagnantbis){
		$("#r"+jgagnantbis[key]).attr("class","rplayer win");
	}
	
}

function resetWinner(){
	for(var i=1;i<7;i++){
		$("#r"+i).attr("class","rplayer");
		$("#tr"+i).text('');
	}
}

//pour afficher les petites cartes permettant de gagner chaque joueur, 
//faire une fonction dans classe poker



function afficheMain(nj, tabc){
	// $("#cr"+nj).slideUp("fast", function () {
	// 	$("#cr"+nj).html("");
	// 	for (var i = 0; i < 5; i++) {
	// 		$("#cr"+nj).append('<img src="images/'+tabc[i].identifier+'.gif" ic="'+tabc[i].identifier+'" class="smallcartes"/> ');
	// 	};

	// 	$("#cr"+nj).slideDown("fast");
	// });

	$("#cr"+nj).slideDown("fast");
	$("#cr"+nj).append('<img src="images/'+tabc[i].identifier+'.gif" ic="'+tabc[i].identifier+'" class="smallcartes"/> ');	
}

function resetMain(){
	for (var nj = 1; nj < 7; nj++) {
		$("#cr"+nj).html("");
		$("#cr"+nj).append('<img src="images/back_deck.png" ic="back_deck.png" class="smallcartes"/> ');
		//  $("#cr"+nj).slideUp("fast", function () {
		// 	$("#cr"+nj).html("");

		// 	for (var i = 0; i < 5; i++) {
		// 		$("#cr"+nj).append('<img src="images/back_deck.png" ic="back_deck.png" class="smallcartes"/> ');
		// 	};

			
		// });
		// $("#cr"+nj).slideDown("fast");
	};
		
}

