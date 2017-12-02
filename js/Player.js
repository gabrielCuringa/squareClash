class Player extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, pv){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);

    }

}

class Attaquant extends Player{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
    }

    attaquer(monstre){


    }

}

class Defenseur extends Player{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, pv){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.pv = pv;
    }

    tirer(){

    }
}