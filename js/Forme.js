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

    draw(ctx){
        ctx.save();

        ctx.translate(this.posX, this.posY);
        ctx.fillStyle = this.couleur;

        /*ctx.shadowColor = 'black';
        ctx.shadowBlur = 5;*/

        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
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

    testeCollisionZone(w, h) {
        if(((this.posX+this.width) >  w) || (this.posX < 0)) {
            this.inverseSensDeplacementX();
        }
        if(((this.posY+this.height) >  h) || (this.posY < 0)) {
            this.inverseSensDeplacementY();
        }
    }
}

class Arme{

    constructor(posX, posY, degat){

    }

}