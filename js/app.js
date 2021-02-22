'use strict';

let maximumClicks = 25;
let attempts = 0;

let leftImageElement = document.getElementById('leftImage');
let middleImageElement = document.getElementById('middleImage');
let rightImageElement = document.getElementById('rightImage');

let ObjectsArray = [];
let namesArr = [];
let arrOfVotes = [];
let shownArray = [];
function Bus(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shows = 0;
    ObjectsArray.push(this);
    namesArr.push(this.name);
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


let leftIndex, rightIndex, middleIndex;
let preIndecies = [];
let flag = true;
function render() {

    do {
        
        if (flag) {
            
            leftIndex = generateRandomIndex();
            middleIndex = generateRandomIndex();
            rightIndex = generateRandomIndex();
        }
        else if(!flag) {
            leftIndex = generateRandomIndex();
            middleIndex = generateRandomIndex();
            rightIndex = generateRandomIndex();

            while(preIndecies.includes(leftIndex) || preIndecies.includes(middleIndex) || preIndecies.includes(rightIndex))  {
                leftIndex = generateRandomIndex();
                middleIndex = generateRandomIndex();
                rightIndex = generateRandomIndex();

            }
    
            console.log(preIndecies);
        }
        console.log('whole while');
        preIndecies=[];
        preIndecies.push(leftIndex);
        preIndecies.push(middleIndex);
        preIndecies.push(rightIndex);
        console.log(preIndecies);


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
        flag = false;
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
        for (let j = 0; j < ObjectsArray.length; j++) {
            arrOfVotes.push(ObjectsArray[j].votes);
            shownArray.push(ObjectsArray[j].shows);
        }
        chartRender();
        pics.removeEventListener('click', handleClicking);
    }
}

function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: namesArr,
            datasets: [{
                label: 'Buses Votes',
                backgroundColor: '#e79c2a',
                borderColor: 'rgb(255, 99, 132)',
                data: arrOfVotes,
            }, {
                label: 'Buses Displayed',
                backgroundColor: '#5a3d55',
                borderColor: 'rgb(155,100,30)',
                data: shownArray,

            }]
        },

        // Configuration options go here
        options: {}
    });
}

