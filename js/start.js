window.onload = init;
let engine;
let zoneAttaquant;

function init() {
    engine = new Engine();
    engine.init();
    zoneAttaquant = new creerZoneAttaquant();


}