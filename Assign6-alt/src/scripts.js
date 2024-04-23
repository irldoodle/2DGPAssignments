//ship objects


var battleship = {
    HULL: "images/ShipBattleshipHull.png",
    HEALTH: 4,
    SIZE: 4,

    stationSelf: function (Xoffset, Yoffset) {
        drawPad.drawImage(
            battleshipImage,
            0, 0, 31, 209,
            Xoffset, Yoffset, 31, 209
        );
        console.log("Battleship Drawn");
    }
};

var destroyer = {
    HULL: "images/ShipDestroyerHull.png",
    HEALTH: 3,
    SIZE: 3,

    stationSelf: function (Xoffset, Yoffset) {
        drawPad.drawImage(
            destroyerImage,
            0, 0, 20, 100,
            Xoffset, Yoffset, 20, 100
        );
        console.log("Destroyer Drawn");
    }
}

var patrol = {
    HULL: "images/ShipPatrolHull.png",
    HEALTH: 2,
    SIZE: 2,

    stationSelf: function (Xoffset, Yoffset) {
        let patrolImage = new Image();
        drawPad.drawImage(
            patrolImage,
            0, 0, 13, 55,
            Xoffset, Yoffset, 13, 55
        );
        console.log("Patrol Drawn");
    }
}

//canvas setup
let canvas = document.querySelector("canvas");
let drawPad = canvas.getContext("2d");
let mapImage = new Image();
//let patrolImage = new Image();
//let destroyerImage = new Image();

mapImage.addEventListener("load", drawGameObject, false);
mapImage.src = "images/oceangrid_final.png";

let battleshipImage = new Image();
battleshipImage.addEventListener("load", drawGameObject, false);

battleshipImage.src = "images/ShipBattleshipHull.png";


/*patrolImage.src = patrol.HULL;
destroyerImage.src = destroyer.HULL;
battleshipImage.src = battleship.HULL;
patrol.stationSelf(121, 82);
destroyer.stationSelf(220, 140);
battleship.stationSelf(0, 44);*/

function drawGameObject() {
    drawPad.drawImage(
        this,
        0, 0
    );
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}