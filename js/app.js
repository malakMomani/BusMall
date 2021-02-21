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
    while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex);
    leftImageElement.setAttribute('src', ObjectsArray[leftIndex].source);
    middleImageElement.setAttribute('src', ObjectsArray[middleIndex].source);
    rightImageElement.setAttribute('src', ObjectsArray[rightIndex].source);
    // console.log(ObjectsArray[leftIndex]);
    // console.log(ObjectsArray[middleIndex]);
    // console.log(ObjectsArray[rightIndex]);

    ObjectsArray[leftIndex].shows++;
    ObjectsArray[middleIndex].shows++;
    ObjectsArray[rightIndex].shows++;
    console.log(ObjectsArray[rightIndex]);

}

render();



function generateRandomIndex() {
    let randomIndex = Math.floor(Math.random() * ObjectsArray.length);
    return randomIndex;
}

let pics = document.getElementById('pics');
pics.addEventListener('click', handleClicking);

function handleClicking(event) {

    attempts++;
    //console.log(event);

    if (attempts <= maximumClicks) {
        if (event.target.id === 'leftImage') {
            ObjectsArray[leftIndex].votes++;

        } else if (event.target.id === 'middleImage') {
            ObjectsArray[middleIndex].votes++;

        } else if (event.target.id === 'rightImage') {
            ObjectsArray[rightIndex].votes++;
        }
        render();
    } else {
        let unorderdList = document.getElementById('unList');
        let li;
        for (let i = 0; i < ObjectsArray.length; i++) {
            li = document.createElement('li');
            unorderdList.appendChild(li);
            // [0]
            //cursin goat it has             
            li.textContent = `${ObjectsArray[i].name} had ${ObjectsArray[i].votes} votes, and was seen ${ObjectsArray[i].shows} times.`
        }

        pics.removeEventListener('click' ,handleClicking);
    }
}
