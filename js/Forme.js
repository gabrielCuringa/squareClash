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

class Missile extends Forme{
    constructor(couleur, defPosX, defPosY, width, height, vitesseX, vitesseY, angle){
        super(defPosX+Math.sin(angle) - Math.cos(angle), defPosY - Math.cos(angle) - Math.sin(angle), couleur, vitesseX+Math.sin(angle)*10, vitesseY-Math.cos(angle)*10, width, height);

        this.angle = angle;
    }

    draw(ctx){
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.translate(this.posX, this.posY);
        ctx.rotate(this.angle);
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore();
    }

    move(){
        this.posX += this.vitesseX;
        this.posY += this.vitesseY;
        //console.log(this.posX);
    }

    testCollisionEnnemi(ennemis){
        //console.log('posX : '+this.posX);
        for(let i=0; i<ennemis.length ; i++){
            if(!((this.posX >= ennemis[i].posX + ennemis[i].width) || (this.posX + this.width <= ennemis[i].posX) || (this.posY >= ennemis[i].posY + ennemis[i].height) || (this.posY + this.height <= ennemis[i].posY))){
                ennemis.splice(ennemis.indexOf(ennemis[i]), 1);
                //joueur.incrementerScore();
                startDoubleExplosion(this.posX, this.posY);
            }
        }
    }
}
