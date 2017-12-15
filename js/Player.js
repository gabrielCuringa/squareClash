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

    ajouterMonstre(monstre){

        if(monstre.cout > this.mana || this.mana === 0){
            console.log("mana trop faible");
        }else{
            attaquant.baisserMana(monstre.cout);
            this.monstres.push(monstre);
        }
    }

    attaquer(monstre){

    }

}

class Defenseur extends Player{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, pv){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.pv = pv;
        this.armeActive = {};
        this.setArmeActive(Arme.getArmes()[0]);
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
        this.armes.push(arme);
        console.log(this.armes);
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

