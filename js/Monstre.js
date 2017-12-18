class Monstre extends Forme{

    constructor(name, posX ,posY, couleur, vitesseX, vitesseY, width, height, degat, cout){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.name = name;
        this.degat = degat;
        this.cout = cout;
    }

    testCollision(touche){
        //console.log('posX : '+this.posX);
        if(!((this.posX >= touche.posX + touche.width) || (this.posX + this.width <= touche.posX) || (this.posY >= touche.posY + touche.height) || (this.posY + this.height <= touche.posY))){
            //console.log("vrai");
            attaquant.monstres.splice(attaquant.monstres.indexOf(this), 1);
            this.attaquer(touche);
            if(this.degat <= 10)
                startDoubleExplosion(this.posX, this.posY);
            else if(this.degat > 10)
                startBigExplosion(this.posX, this.posY);
        }
    }

    attaquer(touche){
        touche.pv -= this.degat;
    }

    static getMonstres(){
        return[new Follower("BLUE" ,0, 0, "rgb(0, 0, 255)", 0, 0, 40, 40, 8, 2),
            new Follower("YELLOW", 0, 0, "rgb(255,255,122)", 0, 0, 20, 20, 8, 2),
            new Follower("BLACK" ,0, 0, "rgb(0,0,0)", 0, 0, 80, 80, 100, 9)
        ];
    }

    setPositions(x, y){
        this.posX = x;
        this.posY = y;
    }
}


class Follower extends Monstre{
    constructor(name, posX ,posY, couleur, vitesseX, vitesseY, width, height, degat, cout){
        super(name, posX, posY, couleur, vitesseX, vitesseY, width, height, degat, cout);
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