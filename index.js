//PUPPY BOWL 2023!!!!
const API_URL = 'https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/players'

const images = [];
const roster = [];


const thumbnailContainer = document.getElementById('image-container');
thumbnailContainer.style.display = 'flex';
thumbnailContainer.style.alignItems = 'flex-start';
thumbnailContainer.style.justifyContent = 'flex-start';
thumbnailContainer.style.flexWrap = 'wrap';

const sectionDivider = document.getElementById('divider-line');
sectionDivider.style.borderBottom = '8px solid black';



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
            id: inData.data.players[i].id
        }

        console.log(inData.data.players[i].id);
        images.push(thumbnail);
    }
}

function renderImages(){

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
        console.log("name " + item.puppyName);

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
            alert(`You clicked on ${item.puppyName}`);
        });
    })
}

fetchDogData(API_URL);
console.log("rest");

