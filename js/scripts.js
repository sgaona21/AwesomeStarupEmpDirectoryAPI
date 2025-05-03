const galleryContainer = document.getElementById('gallery');
let searchBar = document.getElementById('search-input');
let employeeData = []; // I created this variable to store the data from the API 
let empIndex = null; // this variable creates a state for each modal. This helps navigate forward and backward between employees

async function getEmployees() {
    //this function fetches the API data and then calls the helper functions to display content to the page. 
    try {
        let response = await fetch('https://randomuser.me/api/?nat=us&results=12');
        let employees = await response.json();
        employeeData = employees.results;
        displayEmployeeCards(employees);
        attachSearchFeature();
        attachCardListeners();
    } catch (error) {
        console.log(error);
        alert("Failed to load employee data (Sorry)");
    }
}

function displayEmployeeCards(employees) {
    //this function creates a loop to iterate through the employee data and generate the markup for each individual card
    for (let i = 0; i < employees.results.length; i++) {
        let cardContainer = createNewElement('div', ['card']);
        cardContainer.dataset.index = i;
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

function displayEmployeeModal(employeeIndex) {
    //this function takes the user index as an argument and uses that to generate the markup for the modal information. 
    let modalContainer = createNewElement('div', ['modal-container']);
    let modal = createNewElement('div', ['modal']);
    let modalCloseButton = createNewElement('button', ['modal-close-btn'], 'modal-close-btn');
    modalCloseButton.type = 'button';
    let strongX = document.createElement('strong');
    strongX.textContent = 'X';
    let modalInfoContainer = createNewElement('div', ['modal-info-container']);
    let modalImage = createNewElement('img', ['modal-img']);
    modalImage.src = employeeData[employeeIndex].picture.large;
    modalImage.alt = 'profile picture';
    let modalName = createNewElement('h3', ['modal-name'], 'name');
    modalName.textContent = `${employeeData[employeeIndex].name.first} ${employeeData[employeeIndex].name.last}`
    let modalEmail = createNewElement('p', ['modal-text']);
    modalEmail.textContent = employeeData[employeeIndex].email;
    let modalCity = createNewElement('p', ['modal-text']);
    modalCity.textContent = employeeData[employeeIndex].location.city;
    let hr = document.createElement('hr');
    let modalPhone = createNewElement('p', ['modal-text']);
    modalPhone.textContent = employeeData[employeeIndex].cell;
    let modalAddress = createNewElement('p', ['modal-text']);
    modalAddress.textContent = `${employeeData[employeeIndex].location.street.number} ${employeeData[employeeIndex].location.street.name}, ${employeeData[employeeIndex].location.city}, ${employeeData[employeeIndex].location.state}, ${employeeData[employeeIndex].location.postcode}`
    let modalBirthday = createNewElement('p', ['modal-text']);
    let employeeBirthday = employeeData[employeeIndex].dob.date;
    let bday = new Date(employeeBirthday);
    let formattedBirthday = bday.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    modalBirthday.textContent = 'Birthday: ' + formattedBirthday;

    let modalButtonContainer = createNewElement('div', ['modal-btn-container']);
    let previousButton = createNewElement('button', ['modal-prev', 'btn'], 'modal-prev');
    previousButton.type = 'button';
    previousButton.textContent = 'Prev';
    let nextButton = createNewElement('button', ['modal-next', 'btn'], 'modal-next');
    nextButton.type = 'button';
    nextButton.textContent = 'Next';

    modalButtonContainer.append(previousButton, nextButton);
    modalCloseButton.appendChild(strongX);
    modalInfoContainer.append(modalImage, modalName, modalEmail, modalCity, hr, modalPhone, modalAddress, modalBirthday);
    modal.append(modalCloseButton, modalInfoContainer);
    modalContainer.append(modal, modalButtonContainer);
    galleryContainer.appendChild(modalContainer);

    //Here i attached the event listeners for the close, previous, and next buttons. this also removes the current modal from the markup to make room for a new one to be displayed.
    modalCloseButton.addEventListener('click', () => {
        modalContainer.remove();
    })

    previousButton.addEventListener('click', () => {
        modalContainer.remove();
        toggleBack();
    });
    
    nextButton.addEventListener('click', () => {
        modalContainer.remove();
        toggleForward();
    });
}

function createNewElement(elementType, classNames = [], id) {
    //helper function used to create new elements and prevent repeat code
    let newElement = document.createElement(elementType);
    newElement.classList.add(...classNames);
    newElement.id = id;

    return newElement;
}

function attachCardListeners() {
    //this functions attaches an event listener to each card and pulls the index from each card. it then feeds that index into the displayEmployeeModal function and calls it. 
    galleryContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card) {
            empIndex = Number(card.dataset.index);
            displayEmployeeModal(empIndex);
        }
    })
}

function attachSearchFeature() {
    //this function provides the search functionality. it saves the value of the search input and checks each card for a match and hides or displays each corresponding card. 
    searchBar.addEventListener('input', () => {
        let currentInput = searchBar.value.toLowerCase();
        let allChildren = galleryContainer.children;
        for (let i = 0; i < allChildren.length; i++) {
            let child = allChildren[i].querySelector('h3');
            if (!child.textContent.toLowerCase().includes(currentInput)) {
                allChildren[i].style.display = 'none';
            } else {
                allChildren[i].style.display = 'flex';
            }
        }
    })
}

//These two toggle functions make sure the index state never goes out of bounds. it then takes the index and uses it as an argument. It then invokes the displayEmployeeModal function.
function toggleBack() {
    if (empIndex > 0 && empIndex < 12) {
        empIndex--
    }
    displayEmployeeModal(empIndex);
}

function toggleForward() {
    if (empIndex >= 0 && empIndex < 11) {
        empIndex++
    }
    displayEmployeeModal(empIndex);
}

getEmployees();
