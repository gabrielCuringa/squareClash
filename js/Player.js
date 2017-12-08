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
        this.armes = Defenseur.getArmes();
    }

    static getArmes(){
        return {
            DESTRUCTOR: new Arme(0, 0, "rgb('150','134','253')", 4, 10)
        };
    }

    drawVie(ctx){
        ctx.font = 'bold 16pt Helvetica';
        ctx.fillText(this.pv, this.posX+15, this.posY+50);
    }

    setArmeActive(armeSet){

        this.armeActive = armeSet;
        console.log(this.armeActive);
    }

    tirer(){
        this.armeActive.tirer();
    }
}

