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

    static createInstanceImg(){
        var imgsInstances = [];
        this.imgs.forEach(function () {
            var instance = new Image();
            imgsInstances.push(instance);
        });

        return imgsInstances;
    }

    static imgAreLoaded(){
        //var instancesImg = Assets.createInstanceImg();
        var booleanDeNoel = [];

        var images = document.getElementsByTagName("img");
        for(let i=0; i<images.length; i++){
            var datavalue = images[i].getAttribute("data-value");
            console.log("data value "+datavalue);
            images[i].src = datavalue;
            images[i].addEventListener('load', function () {
                booleanDeNoel.push(true);
            }, false);
            images[i].addEventListener('error', function () {
                booleanDeNoel.push(false);
            });
        }

        for(let i=0; i<booleanDeNoel.length; i++){
            if(!booleanDeNoel[i]){
                return false;
            }
        }

        return true;
    }

    loadAudio(){

    }

    static getSrcImage(nom){
        if(nom === "BLUE"){
            return Assets.getSrcImages()[0];
        }else if(nom === "YELLOW"){
            return Assets.getSrcImages()[1];
        }else if(nom === "BLACK"){
            return Assets.getSrcImages()[2];
        }
    }

    static getSrcAudio(nom){
        if(nom === "DESTRUCTOR" || nom === "BUFFATATOR"){
            return Assets.getSrcAudios()[0];
        }
    }

    static getSrcImages(){
        return [
            "../img/blue_card.png",
            "../img/yellow_card.png",
            "../img/black_card.png"
        ];
    }

    static getSrcAudios(){
        return[
            "../son/destructor.mp3",
        ];
    }
}