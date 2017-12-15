window.onload = init;
let engine;
let zoneAtk;

function init() {

    engine = new Engine();
    zoneAtk = new creerZoneAttaquant();
    engine.init();
    zoneAtk.init();

}