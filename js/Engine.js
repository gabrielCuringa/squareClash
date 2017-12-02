let attaquant, defenseur;

function Engine() {

    let canvas, ctx, width, height;

    function init() {
        canvas = document.querySelector("#game");
        ctx = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;

        attaquant = creerJoueur();

        window.addEventListener('keydown', function(event){
            if (event.keyCode === 37) {

                attaquant.vitesseX = -5;

            }else if (event.keyCode === 39) {

                attaquant.vitesseX = 5;

            }else if(event.keyCode === 38){

                attaquant.vitesseY = -5;

            }else if(event.keyCode === 40){

                attaquant.vitesseY = 5;

            }else if(event.keyCode === 81){//touche q

            }else if(event.keyCode === 68){//touche d

            }
        }, false);

        //clavier non touché
        window.addEventListener('keyup', function(event){
            attaquant.vitesseY = 0;
            attaquant.vitesseX = 0;
        }, false);


        requestAnimationFrame(anime);
    }

    function anime(){

        ctx.clearRect(0, 0, width, height);

        attaquant.draw(ctx);

        attaquant.move();

        requestAnimationFrame(anime);

    }
    
    function creerJoueur() {

        let x = 250;
        let y = 250;

        return new Player(x, y, "rgb('255','255','255')", 0, 0, 70, 30);

    }

    return{
        init:init
    }

}