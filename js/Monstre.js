class Monstre extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, degat){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.degat = degat;
    }

    attaquer(joueur){
        joueur.pv -= degat;
    }
}