class Monstre extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, degat, cout){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.degat = degat;
        this.cout = cout;
    }

    testCollision(){
        //console.log('posX : '+this.posX);
        if(!((this.posX >= defenseur.posX + defenseur.width) || (this.posX + this.width <= defenseur.posX) || (this.posY >= defenseur.posY + defenseur.height) || (this.posY + this.height <= defenseur.posY))){
            //console.log("vrai");
            attaquant.monstres.splice(attaquant.monstres.indexOf(this), 1);

            this.attaquer();
            startDoubleExplosion(this.posX, this.posY);
        }
    }

    attaquer(){
        defenseur.pv -= this.degat;
    }
}

class Yellow extends Monstre{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height, 8, 2);
    }

    suivreJoueur(posX, posY){

        //console.log(posX+","+posY);
        if(this.posX != posX){
            if(this.posX > posX){
                this.vitesseX = -1;
            }else if(this.posX < posX){
                this.vitesseX = 1;
            }
        }else {
            this.vitesseX = 0;
        }

        if(this.posY != posY){
            if(this.posY > posY){
                this.vitesseY = -1;
            }else if(this.posY < posY){
                this.vitesseY = 1;
            }
        }else{
            this.vitesseY = 0;
        }

    }
}