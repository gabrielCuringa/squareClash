class Player extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, pv){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);

    }

}

class Attaquant{

    constructor(){
        this.mana = 10;
        this.monstres = [];
        this.zoneDraggable = [width/2, height];
    }

    baisserMana(perte){
        this.mana -= perte;
    }

    regenererMana(){

        let intervalle = null;
        var self = this;

        if(this.mana !== 10){
            intervalle = setInterval(function () {
                if(pauseState)
                    return;
                if(self.mana < 10){
                    self.incrementerMana();
                }
            }, 2500);
        }else{
            console.log("pas regenerer...");
            if(intervalle !== null)
                clearInterval(intervalle);
        }
    }

    getMana(){
        return this.mana;
    }

    incrementerMana(){
        this.mana += 1;
    }

    ajouterMonstre(monstre, x, y){

        monstre.setPositions(x, y);

        if(monstre.cout > this.mana || this.mana === 0){
            console.log("mana trop faible");
        }else{
            this.baisserMana(monstre.cout);
            this.monstres.push(monstre);
        }
    }

    drawZoneNonDraggable(ctx) {
        ctx.save();
        ctx.fillStyle = "rgb(125,125,125)";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(0, 0, this.zoneDraggable[0], this.zoneDraggable[1]);
        ctx.restore();
    }

    iCanDrag(x, y){
        return !((x > this.zoneDraggable[0]) || (y > this.zoneDraggable[1]));
    }

    attaquer(monstre){

    }

}

class Defenseur extends Player{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, pv){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.pv = pv;
        this.armeActive = {};
        //this.armes = Defenseur.getArmes();
        this.armes = [];
        this.setArmeActive(Arme.getArmes()[0]);
        this.centreX = this.width/2;
        this.centreY = this.height/2;
        this.angle = 0;
        this.indexArmeActive = 0;
        this.base = new Base(1100, 150, "rgb(141, 200, 175)", 100, 300);
    }


    drawVie(ctx){
        ctx.save();
        ctx.font = 'bold 16pt Helvetica';
        ctx.fillText(this.pv, this.posX+15, this.posY+50);
        ctx.restore();
    }

    getArmeActive(){
        return this.armeActive;
    }

    setArmeActive(armeSet){
        this.armeActive = armeSet;
        this.armes.push(armeSet);
        this.indexArmeActive +=1;
        //console.log(this.armeActive);
    }

    ramasserArme(arme){

        var checked = this.check(arme);
        if(checked === -1){
            this.armes.push(arme);
        }else{
            checked.recharger();
            console.log(checked.ballesDispo);
        }
        console.log(this.armes);
    }

    changerArme(){

        if(this.indexArmeActive === this.armes.length)
            this.indexArmeActive = 0;

        this.armeActive = this.armes[this.indexArmeActive];
        this.indexArmeActive +=1;
    }

    check(arme){
        for(let i=0; i<this.armes.length ; i++){
            if(this.armes[i].name === arme.name){
                return this.armes[i];
            }
        }
        return -1;
    }

    draw(ctx){
        ctx.save();

        ctx.translate(this.posX, this.posY);
        ctx.fillStyle = this.couleur;

        ctx.translate(this.centreX, this.centreY);
        ctx.rotate(this.angle);
        ctx.translate(-this.centreX, -this.centreY);
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }

    tourner(x, y){
        this.angle = Math.atan2(x,-y);
    }

    tirer(){
        this.armeActive.tirer(this.posX, this.posY, this.angle);
        console.log(this.armeActive.posX);
    }

    collisionArme(armes){
        //console.log(armes);
        for(let i=0; i<armes.length; i++){
            if(!((this.posX >= armes[i].posX + armes[i].width) || (this.posX + this.width <= armes[i].posX) || (this.posY >= armes[i].posY + armes[i].height) || (this.posY + this.height <= armes[i].posY))){

                this.ramasserArme(armes[i]);
                armes.splice(armes.indexOf(armes[i]), 1)
                //console.log("oiu");
                var timeout = setTimeout(function () {
                    armeOnPitch = false;
                }, 10000);
            }
        }

    }

}

