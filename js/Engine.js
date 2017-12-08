let attaquant, defenseur;
let particles = [];

function Engine() {

    let canvas, ctx, width, height;

    function init() {
        canvas = document.querySelector("#game");
        ctx = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;

        attaquant = creerAttaquant();
        defenseur = creerDefenseur();
        defenseur.setArmeActive(Defenseur.getArmes().DESTRUCTOR);

        window.addEventListener('gamepadconnected', function (event) {
            //gamepadHandler(navigator.getGamepads());
        },false);

        window.addEventListener('gamepaddisconnected', function (event) {

        }, false);

        window.addEventListener('keydown', function(event){
            if (event.keyCode === 37) {

                defenseur.vitesseX = -5;

            }else if (event.keyCode === 39) {

                defenseur.vitesseX = 5;

            }else if(event.keyCode === 38){

                defenseur.vitesseY = -5;

            }else if(event.keyCode === 40){

                defenseur.vitesseY = 5;

            }else if(event.keyCode === 81){//touche q

            }else if(event.keyCode === 68){//touche d

            }
        }, false);

        //clavier non touché
        window.addEventListener('keyup', function(event){
            defenseur.vitesseY = 0;
            defenseur.vitesseX = 0;
        }, false);

        requestAnimationFrame(anime);
    }

    function anime(){

        ctx.clearRect(0, 0, width, height);

        //attaquant
        defenseur.draw(ctx);
        defenseur.drawVie(ctx);
        gamepadHandler();
        defenseur.move();

        defenseur.armeActive.draw(ctx);
        defenseur.armeActive.updatePos(defenseur.posX, defenseur.posY);

        defenseur.armeActive.missiles.forEach(function (missile) {
           missile.draw(ctx);
           missile.move();
        });

        attaquant.monstres.forEach(function (monstre) {
            monstre.draw(ctx);
            if(monstre instanceof Yellow){
                monstre.suivreJoueur(defenseur.posX, defenseur.posY);
            }
            monstre.move();
            monstre.testCollision();
        });


        updateAndDrawParticules(10, ctx);
        updateMana();

        requestAnimationFrame(anime);

    }
    
    function gamepadHandler(gamepads){
        var pads = navigator.getGamepads();
        if(pads[0].buttons[0].pressed){
            defenseur.tirer();
        }
    }

    function creerAttaquant() {

        let x = 250;
        let y = 250;

        return new Attaquant(x, y, "rgb('255','255','255')", 0, 0, 70, 30);
    }

    function creerDefenseur() {

        let x = 250;
        let y = 250;

        return new Defenseur(x, y, "rgb(255,255,255)", 0, 0, 70, 30, 100);
    }

    function updateMana() {
        //console.log(attaquant.mana);
        document.querySelector("#mana").innerHTML = "Mana : "+attaquant.mana;
        //console.log(attaquant.mana);
    }

    function creerDeck() {

    }
    
    function dragStartHandler(event) {
        event.dataTransfer.setData("monstre", event.target.dataset.value);
        
    }
    
    function dropHandler(event) {

        var data = event.dataTransfer.getData("monstre");

        console.log(event.dataTransfer.getData("monstre"));
        if(data === "blue"){
            //monstres.push(new Monstre(event.clientX, event.clientY, "rgb('0','0','0')", 0, 0, 20, 20, 4));
            event.preventDefault();
        }else if(data === "yellow"){
            var yellow = new Yellow(event.clientX, event.clientY, "rgb(255,255,122)", 0, 0, 20, 20);
            attaquant.ajouterMonstre(yellow);
            attaquant.baisserMana(yellow.cout);
            event.preventDefault();
        }

        attaquant.regenererMana();
    }

    return{
        init,
        dropHandler,
        dragStartHandler
    }

}