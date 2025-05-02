function getUsersTESTER() {
    fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(users => console.log(users.results[0]))
}

getUsersTESTER()

const galleryContainer = document.getElementById('gallery');


async function getUsers() {
    try {
        let response = await fetch('https://randomuser.me/api/?results=12');
        let users = await response.json();
        displayUsers(users)
    } catch (error) {
        console.log(error);
        alert("Failed to load employee data (Sorry)");
    }
}

function displayUsers(users) {
    for (let i = 0; i < users.results.length; i++) {
        let cardContainer = createNewElement('div', ['card']);
        let cardThumbnailContainer = createNewElement('div', ['card-img-container']);
        let cardThumbnail = createNewElement('img', ['card-img']);
        cardThumbnail.src = users.results[i].picture.large;
        let cardInfoContainer = createNewElement('div', ['card-info-container']);
        let cardNameH3 = createNewElement('h3', ['card-name', 'cap'], 'name');
        cardNameH3.textContent = `${users.results[i].name.first} ${users.results[i].name.last}`;    
        let cardEmail = createNewElement('p', ['card-text']);
        cardEmail.textContent = users.results[i].email;
        let cardLocation = createNewElement('p', ['card-text', 'cap']);
        cardLocation.textContent = `${users.results[i].location.city}, ${users.results[i].location.state}`;

        cardThumbnailContainer.appendChild(cardThumbnail);
        cardInfoContainer.append(cardNameH3, cardEmail, cardLocation);
        cardContainer.append(cardThumbnailContainer, cardInfoContainer);
        galleryContainer.appendChild(cardContainer);
    }
}

//Helper Functions 
function createNewElement(elementType, classNames = [], id) {
    let newElement = document.createElement(elementType);
    newElement.classList.add(...classNames);
    newElement.id = id;

    return newElement
}


getUsers();
