function getUsersTESTER() {
    fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => console.log(data.results))
}

getUsersTESTER()

const galleryContainer = document.getElementById('gallery');




function getUsers() {
    fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => displayUsers(data))
}

function displayUsers(users) {
    console.log('hey lol')
    let employeeCard = document.createElement('div');
    
}

getUsers();
