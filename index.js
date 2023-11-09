//PUPPY BOWL 2023!!!!
const API_URL = 'https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players'

const images = [];
const roster = [];
let currentId = -1; //keeps track of the dog id clicked

const thumbnailContainer = document.getElementById('image-container');
thumbnailContainer.style.display = 'flex';
thumbnailContainer.style.alignItems = 'flex-start';
thumbnailContainer.style.justifyContent = 'flex-start';
thumbnailContainer.style.flexWrap = 'wrap';

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const addRosterBtn = document.querySelector(".btn");

const sectionDivider = document.getElementById('divider-line');
sectionDivider.style.borderBottom = '8px solid black';

const rosterContainer = document.getElementById('roster-container');
rosterContainer.style.display = 'flex';
rosterContainer.style.alignItems = 'flex-start';
rosterContainer.style.justifyContent = 'flex-start';
rosterContainer.style.flexWrap = 'wrap';

const dogDescription = document.getElementById('dog-description');



async function fetchDogData(url){
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        const dogDataString = JSON.stringify(result, null, 2);
        console.log(dogDataString);
        console.log("did we run");
        loadImages(result);
        renderImages();

    }
    catch (err) {
        console.error(err);
    }
}

function loadImages(inData){

    console.log(inData.data.players[1].name);


    for(let i = 0; i < inData.data.players.length; i++){

        const thumbnail = {
            puppyName: inData.data.players[i].name,
            imageUrl: inData.data.players[i].imageUrl,
            id: inData.data.players[i].id,
            breed: inData.data.players[i].breed
        }

        console.log(inData.data.players[i].id);
        images.push(thumbnail);
    }
}

//THIS RENDERS THE CARD IMAGES
function renderImages(){

    thumbnailContainer.innerHTML = '';

    images.forEach(item => {

        //image element
        const imageElement = document.createElement('img');
        imageElement.src = item.imageUrl;
        imageElement.alt = item.puppyName;
        imageElement.style.width = '200px';
        imageElement.style.height = '300px';
        imageElement.style.objectFit = 'cover';


        //name element
        const puppyNameElement = document.createElement('p');
        puppyNameElement.textContent = item.puppyName;

        //create a div and place inside thumbnail container
        const clickableItemContainer = document.createElement('div');
        clickableItemContainer.style.backgroundColor = 'blue';
        clickableItemContainer.style.border = '2px solid black';
        clickableItemContainer.style.minWidth = '200px';
        clickableItemContainer.style.minHeight = '300px';
        clickableItemContainer.style.margin = '10px';

        

        clickableItemContainer.appendChild(puppyNameElement);
        clickableItemContainer.appendChild(imageElement);

        thumbnailContainer.appendChild(clickableItemContainer);

        clickableItemContainer.addEventListener("click", () => {
            openModal();
            currentId = item.id;
    
        });
    })
}

//THIS RENDERS THE ROSTER CARDS
function renderRoster(){

    rosterContainer.innerHTML = '';

    roster.forEach(item => {

        //image element
        const imageElement = document.createElement('img');
        imageElement.src = item.imageUrl;
        imageElement.alt = item.puppyName;
        imageElement.style.width = '200px';
        imageElement.style.height = '300px';
        imageElement.style.objectFit = 'cover';


        //name element
        const puppyNameElement = document.createElement('p');
        puppyNameElement.textContent = item.puppyName;

        //create a div and place inside thumbnail container
        const clickableItemContainer = document.createElement('div');
        clickableItemContainer.style.backgroundColor = 'blue';
        clickableItemContainer.style.border = '2px solid black';
        clickableItemContainer.style.minWidth = '200px';
        clickableItemContainer.style.minHeight = '300px';
        clickableItemContainer.style.margin = '10px';

        

        clickableItemContainer.appendChild(puppyNameElement);
        clickableItemContainer.appendChild(imageElement);

        rosterContainer.appendChild(clickableItemContainer);

        clickableItemContainer.addEventListener("click", () => {
           alert("this did something");
    
        });
    })



}

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    //display the modal relative to where user is on screen
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    modal.style.top = scrollTop + (window.innerHeight / 2) + 'px';

};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

addRosterBtn.addEventListener("click", () => {

    addDogToRosterById(currentId);
    renderImages();
    renderRoster();
    closeModal();
    
})

//THIS FUNCTION ADDS A DOG TO THE ROSTER AND REMOVES THE CARD FROM THE MAIN DECK
function addDogToRosterById(idToAdd){

    const i = images.findIndex(dog => dog.id === idToAdd);
    if(i !== -1){
        roster.push(images[i]);
        images.splice(i, 1);
        console.log('Dog with id ${idToAdd} successfully added to roster.');
    }
    else{
        console.log('Dog with id ${idToRemove} not found in the array.');
    }
}

  

fetchDogData(API_URL);
console.log("rest");

