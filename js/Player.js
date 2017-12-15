class Player extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, pv){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);

    }

}

class Attaquant{

    constructor(){
        this.mana = 10;
        this.monstres = [];
    }

    baisserMana(perte){
        this.mana -= perte;
    }

    regenererMana(){


        let intervalle = null;
        var self = this;

        if(this.mana !== 10){
            intervalle = setInterval(function () {
                if(self.mana !== 10){
                    self.mana += 1;
                }
                else
                    clearInterval(intervalle);

            }, 5000);
        }else{
            console.log("pas regenerer...");
            if(intervalle !== null)
                clearInterval(intervalle);
        }
    }

    getMana(){
        return this.mana;
    }

    ajouterMonstre(monstre){
        this.monstres.push(monstre);
    }

    attaquer(monstre){

    }

}

class Defenseur extends Player{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, pv){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.pv = pv;
        this.armeActive = {};
        this.setArmeActive(Arme.getArmes().DESTRUCTOR);
        //this.armes = Defenseur.getArmes();
        this.armes = [];
        this.angle = 0;
    }


    drawVie(ctx){
        ctx.font = 'bold 16pt Helvetica';
        ctx.fillText(this.pv, this.posX+15, this.posY+50);
    }

    getArmeActive(){
        return this.armeActive;
    }

    setArmeActive(armeSet){

        this.armeActive = armeSet;
        console.log(this.armeActive);
    }

    ramasserArme(arme){
        if(this.armes.indexOf(arme) === -1)
            this.armes.push(arme);
    }

    changerArme(){

    }

    draw(ctx){
        ctx.save();

        ctx.translate(this.posX, this.posY);
        ctx.fillStyle = this.couleur;

        ctx.translate(this.width/2, this.width/2);
        ctx.rotate(this.angle);
        ctx.translate(-this.width/2, -this.width/2);
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }

    tourner(x, y){

        this.angle = Math.atan2(x,-y);
    }

    tirer(){
        this.armeActive.tirer();
    }
}

