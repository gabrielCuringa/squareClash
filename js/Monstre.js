class Monstre extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, degat, cout){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.degat = degat;
        this.cout = cout;
    }

    testCollision(touche){
        //console.log('posX : '+this.posX);
        if(!((this.posX >= touche.posX + touche.width) || (this.posX + this.width <= touche.posX) || (this.posY >= touche.posY + touche.height) || (this.posY + this.height <= touche.posY))){
            //console.log("vrai");
            attaquant.monstres.splice(attaquant.monstres.indexOf(this), 1);
            this.attaquer(touche);
            startDoubleExplosion(this.posX, this.posY);
        }
    }

    attaquer(touche){
        touche.pv -= this.degat;
    }

    getMonstres(){
        return[new Yellow(0, 0, "rgb(255,255,122)", 0, 0, 20, 20)]
    }
}


class Follower extends Monstre{
    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height, degat, cout){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height, degat, cout);
    }

    suivre(posX, posY){

        //console.log(posX+","+posY);
        if(this.posX !== posX){
            if(this.posX > posX){
                this.vitesseX = -1;
            }else if(this.posX < posX){
                this.vitesseX = 1;
            }
        }else {
            this.vitesseX = 0;
        }

        if(this.posY !== posY){
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

class Yellow extends Follower{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height, 8, 2);
    }
}

class Blue extends Follower{
    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height, 8, 2);
    }
}