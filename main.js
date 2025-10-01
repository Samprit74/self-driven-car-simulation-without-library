const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);
const N=1000;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2, getRandomColor()),

    // extra demo obstacles
    new Car(road.getLaneCenter(0), -900, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -1100, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1300, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(0), -1500, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(1), -1700, 30, 50, "DUMMY", 2, getRandomColor()),
    new Car(road.getLaneCenter(2), -1900, 30, 50, "DUMMY", 2, getRandomColor())
];


animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){
    // === Update traffic (red dummy cars) ===
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }

    // === Update AI cars ===
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }

    // === Find best car (leading one) ===
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    // === Resize canvases ===
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    // === Car canvas drawing ===
    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);

    carCtx.restore();

    // === Network canvas drawing ===
    // Add gradient background
    const g = networkCtx.createLinearGradient(0, 0, 0, networkCanvas.height);
    g.addColorStop(0, '#0f0c29');
    g.addColorStop(0.5, '#302b63');
    g.addColorStop(1, '#24243e');
    networkCtx.fillStyle = g;
    networkCtx.fillRect(0, 0, networkCanvas.width, networkCanvas.height);

    // Add animated grid
    networkCtx.save();
    networkCtx.lineWidth = 1;
    networkCtx.strokeStyle = 'rgba(255,255,255,0.05)';
    const gridSize = 40;
    const offset = (time / 20) % gridSize;

    for (let y = -gridSize; y <= networkCanvas.height + gridSize; y += gridSize) {
        networkCtx.beginPath();
        networkCtx.moveTo(0, y + offset);
        networkCtx.lineTo(networkCanvas.width, y + offset);
        networkCtx.stroke();
    }
    for (let x = -gridSize; x <= networkCanvas.width + gridSize; x += gridSize) {
        networkCtx.beginPath();
        networkCtx.moveTo(x + offset, 0);
        networkCtx.lineTo(x + offset, networkCanvas.height);
        networkCtx.stroke();
    }
    networkCtx.restore();

    // === Draw neural network with glow effect ===
    networkCtx.save();
    networkCtx.shadowColor = 'rgba(0,200,255,0.2)';
    networkCtx.shadowBlur = 8;
    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    networkCtx.restore();

    requestAnimationFrame(animate);
}
