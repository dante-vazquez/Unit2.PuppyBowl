//PUPPY BOWL 2023!!!! Puppys and dogs are the same thing.
const API_URL = 
    'https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players';

//Global Variables
const images = [];  //Stores a list of puppies that can be added to a roster
const roster = [];  //Stores the puppies that are in the roster
let currentId = -1; //keeps track of the puppy id clicked

//puppy list element and styles
const thumbnailContainer = document.getElementById('image-container');
thumbnailContainer.style.display = 'flex';
thumbnailContainer.style.alignItems = 'flex-start';
thumbnailContainer.style.justifyContent = 'flex-start';
thumbnailContainer.style.flexWrap = 'wrap';

//puppy roster list and styles
const rosterContainer = document.getElementById('roster-container');
rosterContainer.style.display = 'flex';
rosterContainer.style.alignItems = 'flex-start';
rosterContainer.style.justifyContent = 'flex-start';
rosterContainer.style.flexWrap = 'wrap';

//modal element and styles
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const addRosterBtn = document.querySelector(".btn");

//other elements
const dogDescription = document.getElementById('description');
const instructions = document.getElementById('instructions');

//function fetches the api
async function fetchDogData(url){
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        const dogDataString = JSON.stringify(result, null, 2);
        loadImages(result);
        renderImages();
    }
    catch (err) {
        console.error(err);
    }
}

//function loads the necessary data from the api into an array
function loadImages(inData){

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

//creates and returns a card item that can be rendered
function createCard(item){
    //image element
    const imageElement = document.createElement('img');
    imageElement.src = item.imageUrl;
    imageElement.alt = item.puppyName;
    imageElement.style.width = '200px';
    imageElement.style.height = '280px';
    imageElement.style.objectFit = 'cover';
    
    //name element
    const puppyNameElement = document.createElement('p');
    puppyNameElement.style.paddingLeft = '5px';
    puppyNameElement.textContent = item.puppyName;

    //create a div and place inside thumbnail container
    const clickableItemContainer = document.createElement('div');
    clickableItemContainer.style.backgroundColor = '#F0EAD6';
    clickableItemContainer.style.border = '2px solid black';
    clickableItemContainer.style.minWidth = '200px';
    clickableItemContainer.style.minHeight = '320px';
    clickableItemContainer.style.margin = '10px';
    clickableItemContainer.style.borderRadius = '15px';

    //add the image and name to the card container
    clickableItemContainer.appendChild(puppyNameElement);
    clickableItemContainer.appendChild(imageElement);

    return clickableItemContainer;
}
//renders the puppies that are not in a roster
function renderImages(){

    thumbnailContainer.innerHTML = '';

    images.forEach(item => {

        const clickableItemContainer = createCard(item);
        thumbnailContainer.appendChild(clickableItemContainer);
        
        clickableItemContainer.addEventListener("click", () => {
            currentId = item.id;
            openModal();
        });
    })
}
//renders the puppies that are in a roster
function renderRoster(){
    rosterContainer.innerHTML = '';

    roster.forEach(item => {

        currentId = item.id;
        const clickableItemContainer = createCard(item);
        rosterContainer.appendChild(clickableItemContainer);

        clickableItemContainer.addEventListener("click", () => {
           if(confirm("Are you sure you wanna remove " + 
            roster[rosterGetDog(currentId)].puppyName + " from the roster?")){
                
            console.log("te " + item.id);
                currentId = item.id;
                removeDogFromRoster(currentId);
                renderImages();
                renderRoster();
                updateInstructions();
           }
           else{
            console.log("user pressed no");
           }
        });
    })
}
//opens a modal to allow user to view dog details and add a dog to roster
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    //display the modal relative to where user is on screen
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    modal.style.top = scrollTop + (window.innerHeight / 4.5) + 'px';

    renderModal();
};

//renders the contents of the modal
function renderModal(){

    dogDescription.innerHTML = '';
    console.log("is modal rendering?");
    currentDogIndex = getDog(currentId);
    console.log(images[currentId]);

    const imageElement = document.createElement('img');
    imageElement.src = images[currentDogIndex].imageUrl;
    imageElement.alt = images[currentDogIndex].puppyName;
    imageElement.style.width = '200px';
    imageElement.style.height = '300px';
    imageElement.style.objectFit = 'cover';

    const dogNameElement = document.createElement('p');
    dogNameElement.textContent = "Name: " + images[currentDogIndex].puppyName;
    const dogBreedElement = document.createElement('p');
    dogBreedElement.textContent = "Breed: " + images[currentDogIndex].breed;

    dogDescription.appendChild(imageElement);
    dogDescription.appendChild(dogNameElement);
    dogDescription.appendChild(dogBreedElement);
}

//closes the modal when called
const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
closeModalBtn.addEventListener("click", closeModal);

//adds a puppy to the roster when button is clicked
addRosterBtn.addEventListener("click", () => {

    addDogToRoster(currentId);
    renderImages();
    renderRoster();
    updateInstructions();
    closeModal();
})

//adds a dog(id) to the roster
function addDogToRoster(idToAdd){
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

//removes a dog(id) from the roster
function removeDogFromRoster(idToRemove){
    const i = rosterGetDog(idToRemove);
    console.log("ind " + i);
    if(i !== -1){
        images.push(roster[i]);
        roster.splice(i, 1);
        console.log('Dog with id ${idToAdd} successfully removed from roster.');
    }
    else{
        console.log('Dog with id ${idToRemove} not found in the array.');
    }
}

//gets a dog from the images list depending on the given id
function getDog(id){
    return images.findIndex(dog => dog.id === id);
}

//gets a dog from the roster list depending on the given id
function rosterGetDog(id){
    return roster.findIndex(dog => dog.id === id);
}

//updates instruction above the puppy roster
function updateInstructions(){
    if(roster.length < 1){
        instructions.textContent = 'Click on puppy to add to roster';
    }
    else{
        instructions.textContent = 'Click on puppy to remove from roster';
    }
}

//Driver Code///////////////////////////////////////////////////////////////////
fetchDogData(API_URL);//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

