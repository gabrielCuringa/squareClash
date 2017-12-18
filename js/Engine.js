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
let pauseState = false;
let background = new Image();
const SRC = "../img/squareClashTitle.jpg";

function Engine() {

    let canvas, ctx;

    function init() {
        canvas = document.querySelector("#game");
        ctx = canvas.getContext('2d');
        width = canvas.width;
        height = canvas.height;
        background.src = SRC;

        attaquant = creerAttaquant();
        creerDeck();
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

        gamepad.on('press', 'start', function (event) {
            if(!pauseState)
                pauseState = true;
            else
                pauseState = false;
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
            }else if(event.keyCode === 80){
                // touche P
                pauseState = !pauseState;
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

        if(pauseState){
            jeuPause();
        }else{
            defenseur.draw(ctx);
            defenseur.drawVie(ctx);
            defenseur.testeCollisionZone(width, height);

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
                //monstre.move();
                monstre.testeCollisionZone(width, height);
                if(monstre.name === "YELLOW"){
                    monstre.suivre(defenseur.posX, defenseur.posY);
                    monstre.testCollision(defenseur);
                }else if((monstre.name === "BLACK") || (monstre.name === "BLUE")){
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

            checkFin();
        }

        requestAnimationFrame(anime);

    }

    
    function jeuPause() {
        ctx.save();

        ctx.drawImage(background, 0, 0, width, height);

        ctx.fillStyle = 'bold 16pt Helvetica';
        ctx.fillText("PAUSE", width/2, height/2);

        ctx.restore();
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
        //document.querySelector("#mana").parentNode.innerHTML = "Mana : "+attaquant.mana;
        document.querySelector("#mana").value = attaquant.mana;
    }

    function creerDeck() {
        var zoneAttaquant = document.querySelector("#zoneAttaquant");
        var ul = document.createElement("ul");
        ul.id = "listeMonstres";

        var liMana = document.createElement("li");
        liMana.innerHTML = "";
        var progressMana = document.createElement("meter");
        progressMana.id = "mana";
        progressMana.value = attaquant.mana;
        progressMana.max = attaquant.mana;
        progressMana.min = 0;

        liMana.appendChild(progressMana);
        ul.appendChild(liMana);

        for(let i=0; i<Monstre.getMonstres().length; i++){
            var li = document.createElement("li");
            li.setAttribute("draggable", "true");
            li.setAttribute("ondragstart", "engine.dragStartHandler(event);");
            li.setAttribute("data-value", Monstre.getMonstres()[i].name);
            li.innerHTML = Monstre.getMonstres()[i].name;
            ul.appendChild(li);
        }

        zoneAttaquant.appendChild(ul);
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

        if(attaquant.iCanDrag(event.clientX, event.clientY)){
            if(data === "BLUE"){
                index = 0;
            }else if(data === "YELLOW"){
                //ne pas oublier de setter la posX et Y avec event.client
                index = 1;
            }else if(data === "BLACK"){
                index = 2;
            }
            attaquant.ajouterMonstre(Monstre.getMonstres()[index], event.clientX, event.clientY);

            if(cptDropped === 0){
                attaquant.regenererMana();
                cptDropped += 1;
            }
        }else{
            console.log("zone de dépôt de monstre dépassé");
        }
    }

    function lancerFinJeu() {
        //console.log("fin");
    }

    function checkFin() {
        if(defenseur.pv <= 0 || defenseur.base.pv <= 0){
            lancerFinJeu();
        }
    }

    return{
        init,
        dropHandler,
        dragStartHandler
    }

}