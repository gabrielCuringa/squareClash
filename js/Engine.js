let attaquant, defenseur;
let particles = [];
let padConnected = false;
let canShoot = true;
let gamepad = new Gamepad();
let width,height;
let cptDropped = 0;
let armeOnPitch = false;
let armesOnPitch = [];
let showZoneNonDraggable = false;

function Engine() {

    let canvas, ctx;

    function init() {
        canvas = document.querySelector("#game");
        ctx = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;

        attaquant = creerAttaquant();
        defenseur = creerDefenseur();

        gamepad.on('connect', function (event) {
            padConnected = true;
        });

        gamepad.on('hold', 'd_pad_up',function (event) {
            defenseur.vitesseY = -5;
        });

        gamepad.on('hold', 'd_pad_down',function (event) {
            defenseur.vitesseY = 5;
        });

        gamepad.on('hold', 'd_pad_left',function (event) {
            defenseur.vitesseX = -5;
        });

        gamepad.on('hold', 'd_pad_right',function (event) {
            defenseur.vitesseX = 5;
        });

        gamepad.on('release', 'd_pad_up',function (event) {
            defenseur.vitesseY = 0;
        });

        gamepad.on('release', 'd_pad_down',function (event) {
            defenseur.vitesseY = 0;
        });

        gamepad.on('release', 'd_pad_left',function (event) {
            defenseur.vitesseX = 0;
        });

        gamepad.on('release', 'd_pad_right',function (event) {
            defenseur.vitesseX = 0;
        });

        // PS4 : X et XBOX : A
        gamepad.on('press', 'shoulder_bottom_right',function (event) {

            if(canShoot){
                defenseur.tirer();
            }
            canShoot = false;
            console.log(defenseur.armes);
            //console.log("defenseur pos -> "+defenseur.posX+", "+defenseur.posY);
        });

        gamepad.on('press', 'shoulder_top_right', function (event) {
            console.log(event.button);
            defenseur.changerArme(event.button);
        });

        // Joystick droit
        gamepad.on('hold', 'stick_axis_right', function (event) {
            defenseur.tourner(event.value[0], event.value[1]);
            //console.log(defenseur.posX);
        });

        window.addEventListener('keydown', function(event){
            if (event.keyCode === 81) {

                defenseur.vitesseX = 5;

            }else if (event.keyCode === 68) {

                defenseur.vitesseX = -5;

            }else if(event.keyCode === 83){

                defenseur.vitesseY = -5;

            }else if(event.keyCode === 90){

                defenseur.vitesseY = 5;

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


        defenseur.draw(ctx);
        defenseur.drawVie(ctx);
        setTimeout(function () {
            canShoot = true;
        }, defenseur.getArmeActive().getIntervalleTir());
        defenseur.move();

        defenseur.base.draw(ctx);
        defenseur.base.drawVie(ctx);

        defenseur.armeActive.draw(ctx);
        defenseur.armeActive.updatePos(defenseur.posX, defenseur.posY);

        spawnArme();
        armesOnPitch.forEach(function (arme) {
            arme.drawSpawned(ctx);
        });

        defenseur.armeActive.missiles.forEach(function (missile) {
           missile.draw(ctx);
           missile.move();
           missile.testCollisionEnnemi(attaquant.monstres);
        });

        attaquant.monstres.forEach(function (monstre) {
            monstre.draw(ctx);
            monstre.move();
            if(monstre instanceof Yellow){
                monstre.suivre(defenseur.posX, defenseur.posY);
                monstre.testCollision(defenseur);
            }else if(monstre instanceof Blue){
                monstre.suivre(defenseur.base.posX, defenseur.base.posY);
                monstre.testCollision(defenseur.base);
            }

        });

        particles.forEach(function (particle) {
            if(particle.testeCollisionZone(width, height)){
                particles.splice(particles.indexOf(particle), 1);
            }
        });

        defenseur.collisionArme(armesOnPitch);

        if(showZoneNonDraggable)
            attaquant.drawZoneNonDraggable(ctx);

        updateAndDrawParticules(10, ctx);
        updateMana();

        requestAnimationFrame(anime);

    }

    function creerAttaquant() {

        let x = 250;
        let y = 250;

        return new Attaquant();
    }

    function creerDefenseur() {

        let x = 250;
        let y = 250;

        return new Defenseur(x, y, "rgb(125,125,125)", 0, 0, 70, 30, 100);
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
        console.log("start drag");
        showZoneNonDraggable = true;
    }
    
    function spawnArme() {
        var size = Arme.getArmes().length-1;
        if(!armeOnPitch){
            var arme = Arme.getArmes()[Math.round(Math.random()*size)];
            arme.posX = Math.round(Math.random()*width);
            arme.posY = Math.round(Math.random()*height);
            armesOnPitch.push(arme);
        }
        armeOnPitch = true;
    }
    
    function dropHandler(event) {

        showZoneNonDraggable = false;
        var data = event.dataTransfer.getData("monstre");
        console.log(event.dataTransfer.getData("monstre"));

        if(attaquant.iCanDrag(event.clientX, event.clientY)){
            if(data === "blue"){
                var blue = new Blue(event.clientX, event.clientY, "rgb(0, 0, 255)", 0, 0, 40, 40);
                attaquant.ajouterMonstre(blue);
                event.preventDefault();
            }else if(data === "yellow"){
                var yellow = new Yellow(event.clientX, event.clientY, "rgb(255,255,122)", 0, 0, 20, 20);
                //ne pas oublier de setter la posX et Y avec event.client
                attaquant.ajouterMonstre(yellow);
                event.preventDefault();
            }
            if(cptDropped === 0){
                attaquant.regenererMana();
                cptDropped += 1;
            }
        }else{
            console.log("zone de dépôt de monstre dépassé");
        }
    }

    return{
        init,
        dropHandler,
        dragStartHandler
    }

}