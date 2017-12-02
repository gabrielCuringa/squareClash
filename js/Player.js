class Player extends Forme{

    constructor(posX ,posY, couleur, vitesseX, vitesseY, width, height){
        super(posX, posY, couleur, vitesseX, vitesseY, width, height);


    }

    draw(ctx){
        ctx.save();

        ctx.translate(this.posX, this.posY);
        ctx.fillStyle = this.couleur;

        ctx.shadowColor = 'black';
        ctx.shadowBlur = 10;

        ctx.fillRect(0, 0, this.width, this.height);

        ctx.restore();
    }
}