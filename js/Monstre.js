class Monstre extends Forme{

    constructor(name, posX ,posY, couleur, vitesseX, vitesseY, width, height, degat, cout){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);
        this.name = name;
        this.degat = degat;
        this.cout = cout;
        this.src = this.loadSrc();
    }

    loadSrc(){
        return Assets.getSrcImage(this.name);
    }

    testCollision(touche){
        //console.log('posX : '+this.posX);
        if(!((this.posX >= touche.posX + touche.width) || (this.posX + this.width <= touche.posX) || (this.posY >= touche.posY + touche.height) || (this.posY + this.height <= touche.posY))){
            //console.log("vrai");
            attaquant.monstres.splice(attaquant.monstres.indexOf(this), 1);
            this.attaquer(touche);
            if(this.degat <= 10)
                startDoubleExplosion(this.posX, this.posY, this.couleur);
            else if(this.degat > 10)
                startBigExplosion(this.posX, this.posY);
        }
    }

    attaquer(touche){
        touche.pv -= this.degat;
    }

    static getMonstres(){
        return[new Follower("BLUE" ,0, 0, "rgb(0, 0, 255)", 2, 2, 40, 40, 8, 2),
            new Follower("YELLOW", 0, 0, "rgb(255,255,122)", 2, 2, 20, 20, 8, 2),
            new Follower("BLACK" ,0, 0, "rgb(0,0,0)", 0.5, 0.5, 80, 80, 100, 9)
        ];
    }

    setPositions(x, y){
        this.posX = x;
        this.posY = y;
    }

    getSrc(){
        return this.src;
    }
}


class Follower extends Monstre{
    constructor(name, posX ,posY, couleur, vitesseX, vitesseY, width, height, degat, cout){
        super(name, posX, posY, couleur, vitesseX, vitesseY, width, height, degat, cout);
        this.angle = 0;
    }

    suivre(posX, posY){
        
        this.angle = this.calculerAngle(posX, posY);
        if (posX < this.posX) this.angle += Math.PI;

        this.posX += Math.cos(this.angle) * this.vitesseX;
        this.posY += Math.sin(this.angle) * this.vitesseY;
        //console.log(this.angle);
    }

    calculerAngle(posX, posY){
        return  Math.atan((this.posY - posY)/(this.posX - posX));
    }
}