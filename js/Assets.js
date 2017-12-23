class Assets{

    constructor(){

    }

    playSound(src){
        if(this.isAudio()){
            //play
        }
    }

    /*
    *Code effectué par M.Buffa
    */
    isImage(src) {
        return (src.match(/\.(jpeg|jpg|gif|png)$/) !== null);
    }

    /*
    *Code effectué par M.Buffa
    */
    isAudio(src) {
        return (src.match(/\.(mp3|ogg|wav)$/) !== null);
    }

    static createInstanceImg(toLoad){
        var imgsInstances = [];

        Assets.getObjectToLoad(toLoad).forEach(function () {
            var instance = new Image();
            instance.width = 100;
            instance.height = 130;
            imgsInstances.push(instance);
        });
        //console.log(imgsInstances);
        return imgsInstances;
    }

    static loadImage(callback, toLoad){
        let instancesImg = Assets.createInstanceImg(toLoad);
        //var booleanDeNoel = [];
        let images = Assets.getObjectToLoad(toLoad);

        //var images = document.getElementsByTagName("img");
        for(let i=0; i<instancesImg.length; i++){
            //var datavalue = images[i].getAttribute("data-value");
            instancesImg[i].addEventListener('load',  () => {
                //console.log("load");
                //booleanDeNoel.push(true);
                callback(true, instancesImg[i]);
            }, false);
            instancesImg[i].addEventListener('error', ()=> {
                //booleanDeNoel.push(false);
                callback(false);
            });
            instancesImg[i].src = images[i];
        }

    }

    loadAudio(){

    }

    static getObjectToLoad(toLoad){
        let images = null;
        if(toLoad === "cartes")
            images = Assets.getSrcCardImages();
        else if(toLoad === "joueur")
            images = Assets.getSrcJoueurImage();
        return images;
    }

    static getSrcImage(nom){
        if(nom === "BLUE"){
            return Assets.getSrcCardImages()[0];
        }else if(nom === "YELLOW"){
            return Assets.getSrcCardImages()[1];
        }else if(nom === "BLACK"){
            return Assets.getSrcCardImages()[2];
        }
    }

    static getSrcAudio(nom){
        if(nom === "DESTRUCTOR" || nom === "BUFFATATOR"){
            return Assets.getSrcAudios()[0];
        }
    }

    static getSrcJoueurImage(){
        return ["../img/Personnages/HeroX.png"];
    }

    static getSrcCardImages(){
        return [
            "../img/CartesPersonnages/Buffatator.jpg"
            /*"../img/yellow_card.png",
            "../img/black_card.png"*/
        ];
    }

    static getSrcAudios(){
        return[
            "../son/destructor.mp3",
        ];
    }

    static getLengthAllAssets(){
        return Assets.getSrcJoueurImage().length + Assets.getSrcCardImages().length;
    }
}