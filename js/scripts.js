function getUsersTESTER() {
    fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(employees => console.log(employees.results[0]))
}

getUsersTESTER()

const galleryContainer = document.getElementById('gallery');


async function getUsers() {
    try {
        let response = await fetch('https://randomuser.me/api/?results=12');
        let employees = await response.json();
        displayUserCards(employees)
    } catch (error) {
        console.log(error);
        alert("Failed to load employee data (Sorry)");
    }
}



function displayUserCards(employees) {
    for (let i = 0; i < employees.results.length; i++) {
        let cardContainer = createNewElement('div', ['card']);
        let cardThumbnailContainer = createNewElement('div', ['card-img-container']);
        let cardThumbnail = createNewElement('img', ['card-img']);
        cardThumbnail.src = employees.results[i].picture.large;
        let cardInfoContainer = createNewElement('div', ['card-info-container']);
        let cardNameH3 = createNewElement('h3', ['card-name', 'cap'], 'name');
        cardNameH3.textContent = `${employees.results[i].name.first} ${employees.results[i].name.last}`;    
        let cardEmail = createNewElement('p', ['card-text']);
        cardEmail.textContent = employees.results[i].email;
        let cardLocation = createNewElement('p', ['card-text', 'cap']);
        cardLocation.textContent = `${employees.results[i].location.city}, ${employees.results[i].location.state}`;

        cardThumbnailContainer.appendChild(cardThumbnail);
        cardInfoContainer.append(cardNameH3, cardEmail, cardLocation);
        cardContainer.append(cardThumbnailContainer, cardInfoContainer);
        galleryContainer.appendChild(cardContainer);
    }
}

function displayEmployeeModal() {

}






//Helper Functions 
function createNewElement(elementType, classNames = [], id) {
    let newElement = document.createElement(elementType);
    newElement.classList.add(...classNames);
    newElement.id = id;

    return newElement;
}




galleryContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
        console.log('HEYYYY lol')
    }
})




getUsers();
