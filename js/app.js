'use strict';

let resultDiv = document.getElementById('result');
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

console.log(ObjectsArray);
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
        else if (!flag) {
            leftIndex = generateRandomIndex();
            middleIndex = generateRandomIndex();
            rightIndex = generateRandomIndex();

            while (preIndecies.includes(leftIndex))
            {
                leftIndex = generateRandomIndex();

            }
            while(preIndecies.includes(middleIndex))
            {
                middleIndex = generateRandomIndex();

            }
            while(preIndecies.includes(rightIndex)) {
                rightIndex = generateRandomIndex();

            }

        }
        //preIndecies = [];
        //flag = false;
    }
    while (leftIndex === middleIndex || leftIndex === rightIndex || middleIndex === rightIndex);
        preIndecies[0]= leftIndex;
        preIndecies[1]=middleIndex;
        preIndecies[2]=rightIndex;
    console.log(preIndecies);
    



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

    getResult();
    attempts++;

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
    }
    else {
        for (let j = 0; j < ObjectsArray.length; j++) {
            arrOfVotes.push(ObjectsArray[j].votes);
            shownArray.push(ObjectsArray[j].shows);
        }
        chartRender();
        pics.removeEventListener('click', handleClicking);
    }
    
    savedResult();
    //resultBtn.addEventListener('click', handlingButton);

}

let resultBtn = document.getElementById('resultBtn');
resultBtn.addEventListener('click', handlingButton);

function handlingButton(event) {

    getResult();

    let unorderdList = document.getElementById('unList');
    unorderdList.remove();
    unorderdList = document.createElement('ul');
    resultDiv.appendChild(unorderdList);
    unorderdList.setAttribute('id','unList');
    
    let li;
    for (let i = 0; i < ObjectsArray.length; i++) {
        li = document.createElement('li');
        unorderdList.appendChild(li);       

        li.textContent = `${ObjectsArray[i].name} had ${ObjectsArray[i].votes} votes, and was seen ${ObjectsArray[i].shows} times.`
    }

}

function savedResult (){
    let result = JSON.stringify(ObjectsArray);
    localStorage.setItem('Result',result);
}

function getResult()
{
    let result = localStorage.getItem('Result');
    let storageList = JSON.parse(result);

    if(storageList){
        ObjectsArray=storageList;
    } else {
        ObjectsArray = [];
    }
    // resultBtn.addEventListener('click', handlingButton);
    // console.log(storageList);
    // console.log(ObjectsArray);

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

