// function to create exec cards
async function attachExecs() {
    // get card container element
    const container = document.querySelector("#card-container");
    // load execs file
    const execs = await (await fetch("https://tedclub.herokuapp.com/data/execs")).json();
    // load positions file
    const positions = await (await fetch("json/positions.json")).json();
    // the order each position should appear
    const posindexs = [];
    for (const [key, value] of Object.entries(positions)) {
        posindexs.push(key);
    }
    // load card html
    const card = await (await fetch("html/card.html")).text()
    // function to sort cards based on position
    function comparePos(a, b) {
        return posindexs.indexOf(a.position) - posindexs.indexOf(b.position);
    }
    // keys to replace
    const keys = {
        __NAME:"name",
        __POSITION:"position",
        __DESCRIPTION:"description",
    };
    let cards = [];
    // for each exec
    for (const exec in execs) {
        let tempCard = card;
        // replace all keys with their values
        for (const key in keys) {
            tempCard = tempCard.replaceAll(key, execs[exec][keys[key]]);
        }
        // replace image keys with image on server
        tempCard = tempCard.replaceAll("__IMAGE", "https://tedclub.herokuapp.com/data/images/"+execs[exec].image);
        // replace icon
        tempCard = tempCard.replaceAll("__ICON", positions[execs[exec]["position"]].icon);
        // replace id
        tempCard = tempCard.replaceAll("__ID", "BUTTON"+exec);
        // append card to end of cards list
        cards.push({position:execs[exec]["position"], card:tempCard});
    }
    // sort cards by position
    cards = cards.sort(comparePos);
    // add cards to dom
    for (x in cards) {
        container.innerHTML+=cards[x].card;
    }
    const allcards = document.querySelectorAll(".exec-card");
    allcards[allcards.length-1].style["margin-bottom"] = "1.5rem";
}

attachExecs();