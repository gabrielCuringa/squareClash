class Arme extends Forme{

    constructor(posXJoueur, posYJoueur, couleur, degat, capacite, intervalleTir, son){
        super(posXJoueur+15, posYJoueur-5, couleur, 0, 0, 40, 10);
        this.degat = degat;
        this.intervalleTir = intervalleTir;
        this.capaciteChargeur = capacite;
        this.ballesDispo = capacite;
        this.son = son;
        this.missiles = [];
    }

    tirer(){
        console.log(this.posX);
        if(this.ballesDispo !== 0){
            console.log("balles dispo "+this.ballesDispo);
            this.missiles.push(new Missile(this.posX, this.posY, this.couleur, 10, 10, 12, 12));
            this.ballesDispo -= 1;
            this.jouerSon();
        }else{
            this.recharger();
        }
    }

    draw(ctx){
        ctx.save();

        ctx.translate(this.posX, this.posY);
        ctx.fillStyle = this.couleur;
        ctx.translate(defenseur.width/2, defenseur.width/2);
        ctx.rotate(defenseur.angle);
        ctx.translate(-defenseur.width/2, -defenseur.width/2);
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }

    drawSpawned(ctx){
        ctx.save();

        ctx.translate(width/2, height/2);
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }

    static getArmes(){
        return [new Arme(0, 0, "rgb(150,134,253)", 4, 10, 500, "../son/destructor.mp3"),
            new Arme(0, 0, "rgb(150,134,253)", 100, 1, 500, "../son/destructor.mp3")
        ];
    }

    getIntervalleTir(){
        return this.intervalleTir;
    }

    updatePos(x, y){
        this.posX = x;
        this.posY = y;
    }

    recharger(){
        this.ballesDispo = this.capaciteChargeur;
    }

    jouerSon(){
        var audio = new Audio(this.son);
        audio.play();
    }

    collisionArmeJoueur(joueur){

        if(!((joueur.posX >= this.posX + this.width)|| (joueur.posX + joueur.width <= this.posX)|| (joueur.posY >= this.posY + this.height)||(joueur.posY + joueur.height <= this.posY))){
            joueur.ramasserArme(this);
        }

    }

}
