// Hey! this script is used to send mail to the TED Club backend
// If you attempted to make a bot to spam this email, that would
// be pretty cringe - so don't do that!

const messageElm = document.querySelector("#message");
const nameElm = document.querySelector("#name");
const emailElm = document.querySelector("#email");
const submitElm = document.querySelector("#submit");
submitElm.addEventListener("click", () => {
    send(nameElm.value, emailElm.value, messageElm.value);
    window.location.reload();
});

function send(name, email, message) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://tedclub.herokuapp.com/mail", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener("load", ()=>{
        console.log(this.responseText);
    });
    xhr.send(JSON.stringify({
        name:name,
        email:email,
        message:message
    }));
}