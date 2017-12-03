class Player extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, pv){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);

    }

}

class Attaquant{

    constructor(){

        this.monstres = [];
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
    }

    drawVie(ctx){
        ctx.font = 'bold 16pt Helvetica';
        ctx.fillText(this.pv, this.posX+15, this.posY+50);
    }

    tirer(){

    }
}

