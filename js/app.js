'use strict';

let maximumClicks = 25;
let attempts = 0;

let leftImageElement = document.getElementById('leftImage');
let middleImageElement = document.getElementById('middleImage');
let rightImageElement = document.getElementById('rightImage');

let ObjectsArray = [];

function Bus(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shows = 0;
    ObjectsArray.push(this);
}

new Bus('bag', 'assets/bag.jpg');
new Bus('banana', 'assets/banana.jpg');
new Bus('bathroom', 'assets/bathroom.jpg');
new Bus('boots', 'assets/boots.jpg');
new Bus('breakfast', 'assets/breakfast.jpg');
new Bus('bubblegum', 'assets/bubblegum.jpg');
new Bus('chair', 'assets/chair.jpg');
new Bus('cthulhu', 'assets/cthulhu.jpg');
new Bus('dog-duck', 'assets/dog-duck.jpg');
new Bus('dragon', 'assets/dragon.jpg');
new Bus('pen', 'assets/pen.jpg');
new Bus('pet-sweep', 'assets/pet-sweep.jpg');
new Bus('scissors', 'assets/scissors.jpg');
new Bus('shark', 'assets/shark.jpg');
new Bus('sweep', 'assets/sweep.png');
new Bus('tauntaun', 'assets/tauntaun.jpg');
new Bus('unicorn', 'assets/unicorn.jpg');
new Bus('usb', 'assets/usb.gif');
new Bus('water-can', 'assets/water-can.jpg');
new Bus('wine-glass', 'assets/wine-glass.jpg');

console.log(ObjectsArray);

let leftIndex, rightIndex, middleIndex;
function render() {
    do {
        leftIndex = generateRandomIndex();
        middleIndex = generateRandomIndex();
        rightIndex = generateRandomIndex();

    }
    while(leftIndex === middleIndex ||leftIndex === rightIndex || middleIndex === rightIndex);
    leftImageElement.setAttribute('src',ObjectsArray[leftIndex].source);
    middleImageElement.setAttribute('src',ObjectsArray[middleIndex].source);
    rightImageElement.setAttribute('src',ObjectsArray[rightIndex].source);
    console.log(ObjectsArray[leftIndex]);
    console.log(ObjectsArray[middleIndex]);
    console.log(ObjectsArray[rightIndex]);

}

render();



function generateRandomIndex() {
    let randomIndex = Math.floor(Math.random() * ObjectsArray.length);
    return randomIndex;
}