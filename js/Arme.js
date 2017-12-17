class Arme extends Forme{

    constructor(name, posXJoueur, posYJoueur, couleur, degat, capacite, intervalleTir, son){
        super(posXJoueur+15, posYJoueur-5, couleur, 0, 0, 40, 10);
        this.name = name;
        this.degat = degat;
        this.intervalleTir = intervalleTir;
        this.capaciteChargeur = capacite;
        this.ballesDispo = capacite;
        this.son = son;
        this.missiles = [];
    }

    tirer(x, y, angle){
        console.log(this.posX);
        if(this.ballesDispo !== 0){
            console.log("balles dispo "+this.ballesDispo);
            this.missiles.push(new Missile(this.couleur, x, y, 12, 12, defenseur.vitesseX, defenseur.vitesseY, angle));
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
        ctx.translate(defenseur.centreX, defenseur.centreY);
        ctx.rotate(defenseur.angle);
        ctx.translate(-defenseur.centreX, -defenseur.centreY);
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }

    drawSpawned(ctx){
        ctx.save();

        ctx.translate(this.posX, this.posY);
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }

    static getArmes(){
        return [new Arme("DESTRUCTOR" ,0, 0, "rgb(255, 0, 0)", 4, 10, 500, "../son/destructor.mp3"),
            new Arme("PISTOLET" ,0, 0, "rgb(150,134,253)", 100, 1, 500, "../son/destructor.mp3")
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
}
