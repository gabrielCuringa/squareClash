class Monstre extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, degat){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.degat = degat;
    }

    testCollision(){
        //console.log('posX : '+this.posX);
        if(!((this.posX >= defenseur.posX + defenseur.width) || (this.posX + this.width <= defenseur.posX) || (this.posY >= defenseur.posY + defenseur.height) || (this.posY + this.height <= defenseur.posY))){
            //console.log("vrai");
            attaquant.monstres.splice(attaquant.monstres.indexOf(this), 1);

            this.attaquer(defenseur);
            startDoubleExplosion(this.posX, this.posY);
        }
    }

    attaquer(joueur){
        joueur.pv -= this.degat;
    }
}

class Yellow extends Monstre{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, degat){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height, degat);
        this.degat = degat;
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