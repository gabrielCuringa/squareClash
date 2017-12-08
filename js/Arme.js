class Arme extends Forme{

    constructor(posXJoueur, posYJoueur, couleur, degat, capacite){
        super(posXJoueur+15, posYJoueur-5, couleur, 0, 0, 40, 10);
        this.degat = degat;
        this.capaciteChargeur = capacite;
        this.ballesDispo = capacite;
        this.missiles = [];
    }

    tirer(){
        console.log(this.posX);
        if(this.ballesDispo !== 0){
            console.log("balles dispo "+this.ballesDispo);
            this.missiles.push(new Missile(this.posX+12, this.posY, this.couleur, 1, 1, 12, 12));
            this.ballesDispo -= 1;
        }else{
            this.recharger();
        }
    }

    updatePos(x, y){
        this.posX = x;
        this.posY = y;
    }

    recharger(){
        this.ballesDispo = this.capaciteChargeur;
    }

}
