// function to create exec cards
async function attachExecs() {
    // get card container element
    const container = document.querySelector("#card-container");
    // load execs file
    const execs = await (await fetch("https://tedclub.herokuapp.com/data/execs")).json();
    // load positions file
    const positions = await (await fetch("json/positions.json")).json();
    // load card html
    const card = await (await fetch("html/card.html")).text()
    // keys to replace
    const keys = {
        __NAME:"name",
        __POSITION:"position",
        __DESCRIPTION:"description",
    };
    // for each exec
    for (const exec in execs) {
        let tempCard = card;
        // replace all keys with their values
        for (const key in keys) {
            tempCard = tempCard.replaceAll(key, execs[exec][keys[key]]);
        }
        // replace icon
        tempCard = tempCard.replaceAll("__ICON", positions[execs[exec]["position"]].icon);
        // replace id
        tempCard = tempCard.replaceAll("__ID", "BUTTON"+exec);
        // append card to end of cards list
        container.innerHTML+=tempCard;
        // attach event listener to show more button
        // document.querySelector(`#btnBUTTON${exec}`).addEventListener('click', function(e) {
        //     console.log(target);
        //     e.target.classList.toggle('is-hidden');
        // });
    }
    const cards = document.querySelectorAll(".exec-card");
    cards[cards.length-1].style["margin-bottom"] = "1.5rem";
}

attachExecs();