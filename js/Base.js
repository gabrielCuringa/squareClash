class Base extends Forme{

    constructor(posX ,posY, couleur, width, height){
        super(posX, posY, couleur, 0, 0, width, height);
        this.pv = 1000;
    }

    baisserPv(degat){
        this.pv -= degat;
    }

    drawVie(ctx){
        ctx.font = 'bold 16pt Helvetica';
        ctx.fillText("Pv : "+this.pv, this.posX-15, this.posY-50);
    }
}