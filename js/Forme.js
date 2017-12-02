class Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height){
        this.posX = posX;
        this.posY = posY;
        this.couleur = couleur;
        this.vitesseX = vitesseX;
        this.vitesseY = vitesseY;
        this.width = width;
        this.height = height;
    }



    move() {
        this.posX += this.vitesseX;
        this.posY += this.vitesseY;
    }

    inverseSensDeplacementX() {
        this.vitesseX = -this.vitesseX;
    }

    inverseSensDeplacementY() {
        this.vitesseY = -this.vitesseY;
    }
}