document.addEventListener("DOMContentLoaded", () => {
    fetch(`http://localhost:3000/pups`)
        .then((res) => res.json())
        .then((pups) => renderDogBar(pups));

});

function renderDogBar(pups) {
    const dogBar = document.getElementById("dog-bar");
    pups.forEach((pup) => renderPupsAndAddEventListeners(pup, dogBar));
}

function renderPupsAndAddEventListeners(pup, dogBar) {
    const pupSpan = document.createElement("span");
    pupSpan.addEventListener("click", () => addDogInfoToDOM(pup));
    pupSpan.textContent = pup.name;
    dogBar.appendChild(pupSpan);
}

function addDogInfoToDOM(pup) {
    const pupImage = document.createElement("img");
    const pupH2 = document.createElement("h2");
    const pupButton = document.createElement("button");

    pupImage.src = pup.image;
    pupH2.textContent = pup.name;
    pupButton.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";

    const dogInfoDiv = document.getElementById("dog-info");
    while (dogInfoDiv.lastElementChild) {
        dogInfoDiv.lastElementChild.remove();
    }

    pupButton.addEventListener("click", () => toggleGoodOrBadDog(pup, pupButton));

    dogInfoDiv.appendChild(pupImage);
    dogInfoDiv.appendChild(pupH2);
    dogInfoDiv.appendChild(pupButton);
}

function toggleGoodOrBadDog(pup, pupButton) {
    pup.isGoodDog = !pup.isGoodDog;
    console.log(pup.isGoodDog);
    pupButton.textContent = pup.isGoodDog ? "Good Dog!" : "Bad Dog!";

    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method:'PATCH',
        body: JSON.stringify({ isGoodDog: pup.isGoodDog}),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }).then((res) => console.log(res.json()));
}