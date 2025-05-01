function getUsersTESTER() {
    fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(users => console.log(users.results[0].location.state))
}

getUsersTESTER()

const galleryContainer = document.getElementById('gallery');




function getUsers() {
    fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => displayUsers(data))
}

function displayUsers(users) {
    for (let i = 0; i < users.results.length; i++) {
    let employeeCard = document.createElement('div');
    employeeCard.classList.add('card');

    let cardThumbnailContainer = document.createElement('div');
    cardThumbnailContainer.classList.add('card-img-container');

    let cardThumbnail = document.createElement('img');
    cardThumbnail.classList.add('card-img');
    cardThumbnail.src = users.results[i].picture.thumbnail

    cardThumbnailContainer.appendChild(cardThumbnail);
    employeeCard.appendChild(cardThumbnailContainer);
    galleryContainer.appendChild(employeeCard);

    let cardInfoContainer = document.createElement('div');
    cardInfoContainer.classList.add('card-info-container');

    let cardNameH3 = document.createElement('h3');
    cardNameH3.classList.add('card-name', 'cap');
    cardNameH3.id = 'name';
    cardNameH3.textContent = `${users.results[i].name.first} ${users.results[i].name.last}`;

    cardInfoContainer.appendChild(cardNameH3);
    employeeCard.appendChild(cardInfoContainer);

    let cardEmail = document.createElement('p');
    cardEmail.classList.add('card-text');
    cardEmail.textContent = users.results[0].email;
    cardInfoContainer.appendChild(cardEmail);

    let cardLocation = document.createElement('p');
    cardLocation.classList.add('card-text', 'cap');
    cardLocation.textContent = `${users.results[i].location.city}, ${users.results[i].location.state}`;
    cardInfoContainer.appendChild(cardLocation);
    }
}

getUsers();
